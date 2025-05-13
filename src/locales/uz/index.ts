import { Translation } from "@/types/translations";

const translations: Translation = {
  title: "O'zbekiston uchun AI Yurist",
  subtitle: "Shartnomalarni 30 soniyada tahlil qiling. Bizning AI xavflarni aniqlaydi, matnni tarjima qiladi va huquqiy maslahatlar beradi — o'zbek, rus va ingliz tillarida.",
  cta: {
    title: "Huquqiy ishingizni optimallashtirishga tayyormisiz?",
    description: "O'zbekistonning yetakchi huquqiy firmalariga qo'shiling Legal Nexus AI bilan",
    primary: "Bepul sinab ko'ring",
    secondary: "Demo so'rang"
  },
  features: {
    analysis: {
      title: "Shartnomalarni tahlil qilish",
      description: "AI PDF va Word fayllarini tahlil qiladi, xavfli va bahsli bandlarni aniqlaydi."
    },
    translation: {
      title: "Tezkor tarjima",
      description: "Shartnomalarni o'zbek, rus va ingliz tillariga avtomatik tarjima qiladi."
    },
    riskColoring: {
      title: "Xavf darajasi bo'yicha ranglash",
      description: "Qizil = yuqori xavf, Sariq = ogohlantirish, Yashil = xavfsiz bandlar. Hammasi ajratilgan."
    },
    summaries: {
      title: "Xulosalar va maslahatlar",
      description: "AI qisqa xulosa va huquqiy maslahatlar beradi."
    },
    history: {
      title: "Tahlillar tarixi",
      description: "Tahlil qilingan fayllarni saqlang va istalgan vaqtda ko'rib chiqing. Telegram va veb orqali ishlaydi."
    }
  },
  testimonials: {
    title: "Foydalanuvchilarimiz nima deyishadi",
    items: [
      {
        quote: "Ilgari shartnomalarni o'qishga soatlab vaqt sarflardim. Endi bir daqiqa kifoya.",
        name: "Ahmadjon",
        role: "Tadbirkor"
      },
      {
        quote: "Hatto yuristsiz ham nima imzolayotganimni bilaman.",
        name: "Sevara",
        role: "Marketolog"
      }
    ]
  },
  faq: {
    title: "Ko'p so'raladigan savollar",
    items: [
      {
        question: "Qanday fayl formatlari qo'llab-quvvatlanadi?",
        answer: "PDF va Word (.docx). Faqat faylni yuklang — qolganini biz qilamiz."
      },
      {
        question: "Bu xavfsizmi?",
        answer: "Ha. Biz sizning ruxsatingizsiz shartnomalaringizni saqlamaymiz."
      },
      {
        question: "Bu yuristlar va notariuslar uchun foydali?",
        answer: "Albatta. Vaqtni tejaydi va muhim muammolarni tezda aniqlaydi."
      }
    ]
  },
  footer: {
    contact: "Aloqa",
    legal: "Maxfiylik siyosati",
    rights: "© 2025 Nexus Legal AI. Barcha huquqlar himoyalangan."
  }
};

export default translations;
