import { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Clipboard,
  Copy,
  ExternalLink,
  Landmark,
  LockKeyhole,
  MessageCircle,
  Send,
  ShieldCheck,
  Wallet,
  X,
} from 'lucide-react';

type Account = {
  title: string;
  subtitle: string;
  icon: 'bank' | 'wallet';
  showIcon?: boolean;
  fields: { label: string; value: string }[];
  note?: string[];
  description?: string;
  whatsappMessage?: string;
  date: string;
  directLink?: string;
};

type Country = {
  name: string;
  flag: string;
  code?: string;
};

const whatsappUrl =
  'https://api.whatsapp.com/send/?phone=972566125588&text=%D8%A3%D9%87%D9%84%D8%A2+%D9%85%D9%87%D8%AF%D9%8A+%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%8C+%D8%A3%D8%B1%D9%8A%D8%AF+%D8%A5%D8%B1%D8%B3%D8%A7%D9%84+%D8%A5%D8%B4%D8%B9%D8%A7%D8%B1+%D8%A7%D9%84%D8%AA%D8%AD%D9%88%D9%8A%D9%84&type=phone_number&app_absent=0';

const createWhatsappUrl = (message: string) =>
  `https://api.whatsapp.com/send/?phone=972566125588&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;

const countries: Country[] = [
  { name: 'المغرب', flag: '🇲🇦' },
  { name: 'باي بال', flag: '▣' },
  { name: 'العراق', flag: '🇮🇶' },
  { name: 'الجزائر', flag: '🇩🇿' },
  { name: 'الأردن', flag: '🇯🇴' },
  { name: 'السعودية', flag: '🇸🇦' },
  { name: 'أمريكا', flag: '🇺🇸' },
  { name: 'سلطنة عمان', flag: '🇴🇲' },
  { name: 'أوروبا', flag: '🇪🇺' },
  { name: 'الإمارات', flag: '🇦🇪' },
  { name: 'مصر', flag: '🇪🇬' },
  { name: 'تونس', flag: '🇹🇳' },
];

const accounts: Record<string, Account[]> = {
  المغرب: [
    {
      title: 'البنك الشعبي (Banque Populaire)',
      subtitle: 'حساب بنكي مباشر · محدث',
      icon: 'bank',
      fields: [
        { label: 'اسم صاحب الحساب', value: 'Mr AAhmed' },
        { label: 'رقم الحساب', value: '2114068457450001' },
        { label: 'رقم RIB', value: '181 810 2114068457450001 86' },
      ],
      date: '16 Oct, 2026',
    },
    {
      title: 'بنك سياش',
      subtitle: 'حساب بنكي مباشر · محدث',
      icon: 'bank',
      fields: [
        { label: 'اسم صاحب الحساب', value: 'Mr AAhmed' },
        { label: 'رقم الحساب', value: '6615203214034800' },
        { label: 'رقم RIB', value: '230 810 6615203214034800 04' },
      ],
      date: '16 Oct, 2026',
    },
  ],
  'باي بال': [
    {
      title: 'بايبال (PayPal)',
      subtitle: 'محفظة إلكترونية · محدث',
      icon: 'wallet',
      fields: [
        { label: 'البريد الإلكتروني', value: 'majdi25bel@gmail.com' },
      ],
      directLink: 'https://www.paypal.me/MajdiAlnajjar226',
      note: [
        '⚠️ طريقة الإرسال: يجب اختيار Friends and Family عند الإرسال (Send the payment as Friends and Family).',
        '🚨 تنبيه حاسم: ممنوع منعاً باتّاً كتابة أي ملاحظات (مثل: غزة، تبرعات، أو ما شابه)، وإلا لن يتم اعتماد الحوالة أو ستفرض غرامة 5% من قيمتها.',
      ],
      date: '16 Oct, 2026',
    },
  ],
  العراق: [
    {
      title: 'ماستر كارد (ماستر استقبال)',
      subtitle: 'حساب بنكي مباشر · محدث',
      icon: 'bank',
      fields: [
        { label: 'اسم البنك', value: 'ماستر كارد (ماستر استقبال)' },
        { label: 'رقم الحساب / البطاقة', value: '7136527939' },
        { label: 'اسم المستفيد', value: 'Sajad' },
      ],
      note: ['أقل مبلغ للتحويل 100 ألف دينار عراقي'],
      date: '17 Oct, 2026',
    },
  ],
  الجزائر: [
    {
      title: 'حساب استقبال',
      subtitle: 'حساب بنكي مباشر · محدث',
      icon: 'bank',
      fields: [
        { label: 'نوع الحساب', value: 'حساب استقبال' },
        { label: 'اسم المستفيد', value: 'جوادة السعيد' },
        { label: 'رقم الحساب (RIB)', value: '00799999000636464348' },
        { label: 'المفتاح (CLE)', value: '6364643cle 48' },
      ],
      note: [
        '🚫 عدم نشر الحساب للعامة',
        '🚫 عدم نشر الحساب على وسائل التواصل الاجتماعي 📱',
        '🚫 يتم تحديث الحساب بشكل يومي',
        '🚫 الحساب لمرة واحدة فقط',
      ],
      date: '17 Oct, 2026',
    },
  ],
  الأردن: [
    {
      title: 'البنك الإسلامي الأردني',
      subtitle: 'حساب بنكي مباشر · محدث',
      icon: 'bank',
      fields: [
        { label: 'اسم البنك', value: 'البنك الإسلامي الأردني' },
        { label: 'رقم الحساب / الآيبان', value: 'SRMBL' },
        { label: 'اسم المستفيد', value: 'هيفاء أحمد محمود' },
      ],
      note: [
        '📌 يجب إرسال سكرين شوت لوصل الإرسال واسم المرسل للتشييك.',
        '⚠️ الحساب فعال، ولكن تجنباً لأي خلل يرجى مراجعتنا قبل التحويل وإلا لن يكون المكتب مسؤولاً عن أي خلل.',
      ],
      date: '17 Oct, 2026',
    },
  ],
  السعودية: [
    {
      title: 'حساب السعودية',
      subtitle: 'حساب متاح عبر الواتساب',
      icon: 'bank',
      fields: [],
      description: 'يتم تزويدك بالحساب من خلال الواتساب',
      whatsappMessage: 'مرحباً، أريد حساب السعودية',
      date: 'قريباً',
    },
  ],
  أمريكا: [
    {
      title: 'حساب أمريكا',
      subtitle: 'حساب متاح عبر الواتساب',
      icon: 'bank',
      fields: [],
      description: 'يتم تزويدك بالحساب من خلال الواتساب',
      whatsappMessage: 'مرحباً، أريد حساب أمريكا',
      date: 'قريباً',
    },
  ],
  'سلطنة عمان': [
    {
      title: 'حساب سلطنة عمان',
      subtitle: 'حساب متاح عبر الواتساب',
      icon: 'bank',
      fields: [],
      description: 'يتم تزويدك بالحساب من خلال الواتساب',
      whatsappMessage: 'مرحباً، أريد حساب سلطنة عمان',
      date: 'قريباً',
    },
  ],
  أوروبا: [
    {
      title: 'حساب أوروبا',
      subtitle: 'حساب متاح عبر الواتساب',
      icon: 'bank',
      fields: [],
      description: 'يتم تزويدك بالحساب من خلال الواتساب',
      whatsappMessage: 'مرحباً، أريد حساب أوروبا',
      date: 'قريباً',
    },
  ],
  الإمارات: [
    {
      title: 'حساب الإمارات',
      subtitle: 'حساب متاح عبر الواتساب',
      icon: 'bank',
      fields: [],
      description: 'يتم تزويدك بالحساب من خلال الواتساب',
      whatsappMessage: 'مرحباً، أريد حساب الإمارات',
      date: 'قريباً',
    },
  ],
  مصر: [
    {
      title: 'حساب مصر',
      subtitle: 'حساب متاح عبر الواتساب',
      icon: 'bank',
      fields: [],
      description: 'يتم تزويدك بالحساب من خلال الواتساب',
      whatsappMessage: 'مرحباً، أريد حساب مصر',
      date: 'قريباً',
    },
  ],
  تونس: [
    {
      title: 'حساب تونس',
      subtitle: 'حساب متاح عبر الواتساب',
      icon: 'bank',
      fields: [],
      description: 'يتم تزويدك بالحساب من خلال الواتساب',
      whatsappMessage: 'مرحباً، أريد حساب تونس',
      date: 'قريباً',
    },
  ],
};

function BrandMark() {
  return (
    <div className="brand-mark" aria-label="مهدي خدمات">
      <img src="/image.png" alt="شعار مهدي خدمات" />
    </div>
  );
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to legacy method
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';
    textarea.style.fontSize = '16px';

    const isIOS = /ipad|iphone|ipod/i.test(navigator.userAgent);
    if (isIOS) {
      textarea.contentEditable = 'true';
      textarea.readOnly = false;
      const range = document.createRange();
      range.selectNodeContents(textarea);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      textarea.setSelectionRange(0, text.length);
    } else {
      textarea.focus();
      textarea.select();
    }

    document.body.appendChild(textarea);
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

type ToastState = { id: number; message: string } | null;

function AccountCard({ account, showToast }: { account: Account; showToast: (message: string) => void }) {
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyDetails = async () => {
    const ok = await copyToClipboard(account.fields.map((field) => `${field.label}: ${field.value}`).join('\n'));
    if (ok) {
      setCopied(true);
      showToast('تم نسخ جميع البيانات بنجاح');
      window.setTimeout(() => setCopied(false), 1800);
    } else {
      showToast('تعذّر النسخ، حاول مرة أخرى');
    }
  };

  const copyField = async (field: { label: string; value: string }) => {
    const ok = await copyToClipboard(field.value);
    if (ok) {
      setCopiedField(field.value);
      showToast(`تم نسخ ${field.label} بنجاح`);
      window.setTimeout(() => setCopiedField(null), 1800);
    } else {
      showToast('تعذّر النسخ، حاول مرة أخرى');
    }
  };

  return (
    <article className="account-card">
      <header className="account-header">
        {account.showIcon !== false && <div className="account-icon">{account.icon === 'bank' ? <Landmark size={25} /> : <Wallet size={25} />}</div>}
        <div><h3>{account.title}</h3><p>{account.subtitle}</p></div>
      </header>
      <div className="account-body">
        {account.fields.length > 0 && <div className="field-list">
          {account.fields.map((field) => (
            <div className="field-row" key={`${field.label}-${field.value}`}>
              <div><span>{field.label}</span><strong>{field.value}</strong></div>
              <button className="copy-field" onClick={() => copyField(field)} aria-label={`نسخ ${field.label}`}>{copiedField === field.value ? <Check size={17} /> : <Copy size={17} />}</button>
            </div>
          ))}
        </div>}
        {account.description && <p className="account-description">{account.description}</p>}
        {account.note && <div className="note-box"><strong><ShieldCheck size={16} /> ملاحظات مهمة</strong>{account.note.map((note, index) => <p key={note}>{index + 1}. {note}</p>)}</div>}
        <div className="card-actions">
          {account.whatsappMessage ? <a className="primary-button" href={createWhatsappUrl(account.whatsappMessage)} target="_blank" rel="noreferrer"><MessageCircle size={16} /> طلب الحساب عبر الواتساب</a> : <>
            <button className="outline-button" onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}><Send size={16} /> إرسال إشعار التحويل</button>
            {account.directLink && <a className="outline-button direct-link" href={account.directLink} target="_blank" rel="noreferrer"><ExternalLink size={16} /> فتح PayPal.me</a>}
            <button className="primary-button" onClick={copyDetails}>{copied ? <><Check size={16} /> تم النسخ</> : <><Copy size={16} /> نسخ البيانات</>}</button>
          </>}
        </div>
        <div className="updated"><span>آخر تحديث:</span> {account.date}</div>
      </div>
    </article>
  );
}

function Toast({ toast }: { toast: ToastState }) {
  if (!toast) return null;
  return (
    <div className="toast" role="status" key={toast.id}>
      <Check size={16} /> {toast.message}
    </div>
  );
}

function App() {
  const [selectedCountry, setSelectedCountry] = useState('الأردن');
  const [showMenu, setShowMenu] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const countryListRef = useRef<HTMLDivElement>(null);
  const visibleAccounts = accounts[selectedCountry] ?? accounts.الأردن;

  const showToast = (message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => {
      setToast((current) => (current && current.id === id ? null : current));
    }, 2000);
  };

  const scrollCountries = (direction: 'left' | 'right') => {
    countryListRef.current?.scrollBy({ left: direction === 'right' ? 260 : -260, behavior: 'smooth' });
  };

  return (
    <div className="app-shell" dir="rtl">
      <div className="top-strip"><div className="container strip-inner"><span><Check size={14} /> حسابات محدثة يومياً</span><span>خدمة آمنة وموثوقة للتحويلات</span><span className="strip-lock"><LockKeyhole size={14} /> بياناتك محمية</span></div></div>
      <header className="site-header">
        <div className="container nav-bar">
          <a className="brand" href="#home"><div><strong>MAHDI KHDAMATI</strong><small>مهدي خدماتي</small></div><img className="brand-logo" src="/image.png" alt="شعار مهدي خدمات" /></a>
          <nav><a href="#about">عن المنصة</a><a href="#countries">الدول والمسارات</a><a href="#accounts">الحسابات</a></nav>
          <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /> تواصل واتساب</a>
          <button className="mobile-menu-button" onClick={() => setShowMenu(!showMenu)} aria-label="فتح القائمة"><ChevronDown size={20} /></button>
        </div>
        {showMenu && <nav className="mobile-nav"><a href="#about" onClick={() => setShowMenu(false)}>عن المنصة</a><a href="#countries" onClick={() => setShowMenu(false)}>الدول والمسارات</a><a href="#accounts" onClick={() => setShowMenu(false)}>الحسابات</a></nav>}
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-glow" />
          <div className="container hero-content">
            <div className="hero-copy" id="about">
              <div className="eyebrow"><span /> للخدمات المالية الإلكترونية</div>
              <h1>منصة <em>مهدي خدماتي</em><br />تقرّب لك الحسابات</h1>
              <p>تسهيل الوصول لحسابات التحويل والمحافظ الإلكترونية من مكان واحد</p>
              <div className="hero-actions"><a className="primary-button large" href="#accounts"><Building2 size={18} /> تصفح الحسابات</a><a className="outline-button large" href={whatsappUrl} target="_blank" rel="noreferrer"><Send size={17} /> إرسال إشعار التحويل</a></div>
            </div>
            <div className="hero-card-wrap">
              <div className="hero-card">
                <div className="hero-logo"><img src="/image.png" alt="شعار مهدي خدماتي للخدمات المالية الإلكترونية" /></div>
              </div>
              <div className="floating-badge"><Check size={15} /> منصة موثوقة وآمنة</div>
            </div>
          </div>
        </section>

        <section className="coverage-section" id="countries">
          <div className="container coverage-card"><div className="currency-row"><span>$</span><span>€</span><span>د.إ</span><span>ريال</span></div><div><p className="section-kicker">تغطية واسعة</p><h2>خطوط تحويل في الدول الأساسية</h2><p>تجد الحسابات النشطة باستمرار وتظهر لك فقط البيانات الجاهزة للاستلام.</p><div className="mini-pills"><span>موثق</span><span>متاح يومياً</span><span>سريع ومرن</span></div></div></div>
        </section>

        <section className="accounts-section" id="accounts">
          <div className="container">
            <div className="section-heading"><div><p className="section-kicker">حسابات المكاتب</p><h2>اختر بلد التحويل</h2><p>انسخ بيانات الحساب الظاهرة فقط لضمان أن تكون صالحة ومحدثة.</p></div><div className="live-status"><i /> تحديث مباشر</div></div>
            <div className="country-navigation"><button className="round-button" type="button" onClick={() => scrollCountries('right')} aria-label="الدول السابقة"><ArrowRight size={18} /></button><div className="country-list" ref={countryListRef}>{countries.map((country) => <button key={country.name} className={`country-pill ${selectedCountry === country.name ? 'selected' : ''}`} onClick={() => setSelectedCountry(country.name)}><span>{country.flag}</span>{country.name}</button>)}</div><button className="round-button" type="button" onClick={() => scrollCountries('left')} aria-label="الدول التالية"><ArrowLeft size={18} /></button></div>
            <div className="selected-country-label"><span>اسحب للتصفح</span><strong>{selectedCountry}</strong></div>
            <div className="accounts-grid">{visibleAccounts.map((account, index) => <AccountCard key={`${account.title}-${index}`} account={account} showToast={showToast} />)}</div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container"><BrandMark /><p>منصة مهدي خدماتي — حسابات تحويل موثوقة ومحدثة للمكاتب.</p><span className="office-address">عنوان المكتب: غزة، مخيم الشاطئ، قهوه غبن</span><span>© 2026 جميع الحقوق محفوظة</span></div></footer>
      <div className="floating-tools"><button aria-label="نسخ"><Clipboard size={15} /></button><button aria-label="قفل"><LockKeyhole size={14} /></button><button aria-label="إغلاق"><X size={15} /></button></div>
      <Toast toast={toast} />
    </div>
  );
}

export default App;
