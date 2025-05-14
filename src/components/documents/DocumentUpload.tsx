// src/components/documents/DocumentUpload.tsx
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface SupabaseError {
  message: string;
  status?: number;
  details?: string;
}

export const DocumentUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  /* ── актуальная сессия ─────────────────────────────────────────── */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
  }, []);

  /* ── главный процесс загрузки ──────────────────────────────────── */
  const handleUpload = async (file: File) => {
    if (!user) {
      toast.error("You must be logged in to upload documents");
      return;
    }

    try {
      setIsUploading(true);

      /* 1. upload to storage */
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: storageErr } = await supabase.storage
        .from("legal_documents")
        .upload(filePath, file);

      if (storageErr) throw storageErr;

      /* 2. insert DB record */
      const { data: document, error: dbErr } = await supabase
        .from("documents")
        .insert({
          name: file.name,
          file_path: filePath,
          type: file.type,
          status: "pending",
          user_id: user.id,
        })
        .select()
        .single();

      if (dbErr) throw dbErr;

      toast.success("Document uploaded successfully");

      /* 3. read & invoke Edge-function */
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;

        const {
          data: { session },
        } = await supabase.auth.getSession();
        const token = session?.access_token;

        const { error: funcErr } = await supabase.functions.invoke(
          "analyze-document",
          {
            body: { documentId: document.id, documentText: text },
            headers: { Authorization: `Bearer ${token}` }, // 🔑
          },
        );

        if (funcErr) {
          console.error(funcErr);
          toast.error("Error analyzing document: " + funcErr.message);
        } else {
          toast.success("Document analysis started");
        }
      };

      reader.readAsText(file);
    } catch (err: unknown) {
      const error = err as SupabaseError;
      console.error(error);
      toast.error(error.message ?? "Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  /* ── helpers для drag'n'drop ───────────────────────────────────── */
  const triggerInput = () => document.getElementById("file-upload")?.click();

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleUpload(f);
  };
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleUpload(f);
  };

  /* ── UI ────────────────────────────────────────────────────────── */
  return (
    <div
      className={`relative rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-all ${isDragging
          ? "border-2 border-dashed border-primary bg-primary/5"
          : "border-2 border-dashed border-gray-200 bg-gradient-to-b from-white to-gray-50"
        }`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={onInput}
      />

      <div className="space-y-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-6 w-6 text-primary" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-darkPurple">
            {isDragging ? "Drop your file here" : "Upload your document"}
          </p>
          <p className="text-xs text-neutral-gray">
            PDF, DOC, DOCX or TXT (max&nbsp;10&nbsp;MB)
          </p>
        </div>

        <Button onClick={triggerInput} disabled={isUploading || !user}>
          {isUploading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Uploading…
            </span>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
