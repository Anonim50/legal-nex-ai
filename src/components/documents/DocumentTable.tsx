import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

import { Table, TableBody } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentPreview } from "./DocumentPreview";
import { DeleteConfirmation } from "./DeleteConfirmation";

import { Document } from "./types";
import { DocumentTableHeader } from "./table/DocumentTableHeader";
import { EmptyDocumentState } from "./table/EmptyDocumentState";
import { DocumentRow } from "./table/DocumentRow";

interface Props {
  documents: Document[];
  loading: boolean;
}

interface StorageError {
  message: string;
  statusCode?: number;
}

type SupabaseError = StorageError | PostgrestError;

export const DocumentTable = ({ documents, loading }: Props) => {
  /* ───────────────────── локальное состояние списка ───────────────────── */
  const [docs, setDocs] = useState<Document[]>(documents);

  /* когда пришли новые props.documents — синхронизируем state */
  useEffect(() => {
    setDocs(documents);
  }, [documents]);

  /* ───────────────────── состояние превью / удаления ───────────────────── */
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  /* ───────────────────── preview handler ───────────────────── */
  const handlePreview = async (doc: Document) => {
    try {
      setSelectedDoc(doc);
      setIsPreviewOpen(true);

      const {
        data: { signedUrl },
        error,
      } = await supabase.storage
        .from("legal_documents")
        .createSignedUrl(doc.file_path, 3600);
      if (error) throw error;
      setPreviewUrl(signedUrl);

      /* если TXT — загружаем контент */
      if (
        doc.type === "text/plain" ||
        doc.type === "application/txt" ||
        doc.file_path.endsWith(".txt")
      ) {
        const { data, error: dlErr } = await supabase.storage
          .from("legal_documents")
          .download(doc.file_path);
        if (dlErr) throw dlErr;

        setPreviewContent(await data.text());
      }
    } catch (err) {
      const error = err as SupabaseError;
      console.error(error);
      toast.error("Error loading preview");
    }
  };

  /* ───────────────────── delete handler ───────────────────── */
  const handleDelete = async () => {
    if (!selectedDoc) return;

    try {
      await supabase.storage
        .from("legal_documents")
        .remove([selectedDoc.file_path]);

      const { error: dbErr } = await supabase
        .from("documents")
        .delete()
        .eq("id", selectedDoc.id);
      if (dbErr) throw dbErr;

      /* локально убираем строку */
      setDocs((cur) => cur.filter((d) => d.id !== selectedDoc.id));

      toast.success("Document deleted");
      setIsDeleteOpen(false);
      setSelectedDoc(null);
    } catch (err: unknown) {
      const error = err as SupabaseError;
      console.error(error);
      toast.error("Delete error: " + (error.message ?? "Unknown error"));
    }
  };

  /* ───────────────────── UI: skeleton / empty ───────────────────── */
  if (loading)
    return (
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <DocumentTableHeader />
          <TableBody>
            {[...Array(3)].map((_, i) => (
              <tr key={i} className="border-b hover:bg-neutral-softGray/50">
                <td className="p-4">
                  <Skeleton className="h-4 w-[240px]" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-[80px]" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-[100px]" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-[80px]" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-[80px]" />
                </td>
                <td className="p-4 text-right flex gap-2 justify-end">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>
    );

  if (docs.length === 0) return <EmptyDocumentState />;

  /* ───────────────────── основная таблица ───────────────────── */
  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table>
          <DocumentTableHeader />
          <TableBody>
            {docs.map((doc) => (
              <DocumentRow
                key={doc.id}
                document={doc}
                onPreview={handlePreview}
                onDelete={() => {
                  setSelectedDoc(doc);
                  setIsDeleteOpen(true);
                }}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ───── модалки ───── */}
      {selectedDoc && (
        <>
          <DocumentPreview
            isOpen={isPreviewOpen}
            onClose={() => {
              setIsPreviewOpen(false);
              setSelectedDoc(null);
              setPreviewUrl(null);
              setPreviewContent(null);
            }}
            documentUrl={previewUrl ?? undefined}
            documentContent={previewContent ?? undefined}
            documentName={selectedDoc.name as string}
            documentType={String(selectedDoc.type)}
          />

          <DeleteConfirmation
            isOpen={isDeleteOpen}
            onClose={() => {
              setIsDeleteOpen(false);
              setSelectedDoc(null);
            }}
            onConfirm={handleDelete}
            documentName={selectedDoc.name as string}
          />
        </>
      )}
    </>
  );
};
