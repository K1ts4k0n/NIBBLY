import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const outPdfPath = path.join(rootDir, 'NIBBLY_LINE_AI_Chatbot_Knowledge_Base.pdf');

function getBase64(filePath) {
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : (ext === '.jpg' || ext === '.jpeg') ? 'image/jpeg' : 'image/png';
    return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`;
  }
  return '';
}

const logoBase64 = getBase64(path.join(rootDir, 'public/nibbly-logo-crop.png'));
const mascotBase64 = getBase64(path.join(rootDir, 'public/richmenu/mascot.jpg'));
const granolaBase64 = getBase64(path.join(rootDir, 'public/richmenu/granola.jpg'));
const couponBase64 = getBase64(path.join(rootDir, 'public/richmenu/coupon.jpg'));
const storeBase64 = getBase64(path.join(rootDir, 'public/richmenu/store.jpg'));
const chatBase64 = getBase64(path.join(rootDir, 'public/richmenu/chat.jpg'));

// Products Base64 mapping
const productImages = {
  'berry-granola': getBase64(path.join(rootDir, 'public/products/berry-granola.jpg')),
  'honey': getBase64(path.join(rootDir, 'public/products/honey.jpg')),
  'tropical': getBase64(path.join(rootDir, 'public/products/tropical.jpg')),
  'banana': getBase64(path.join(rootDir, 'public/products/banana.jpg')),
  'strawberry-yogurt': getBase64(path.join(rootDir, 'public/products/strawberry-yogurt.jpg')),
  'blueberry': getBase64(path.join(rootDir, 'public/products/blueberry.jpg')),
  'cashew': getBase64(path.join(rootDir, 'public/products/cashew.jpg')),
  'choco': getBase64(path.join(rootDir, 'public/products/choco.jpg')),
  'coconut': getBase64(path.join(rootDir, 'public/products/coconut.jpg')),
  'mixed-berry': getBase64(path.join(rootDir, 'public/products/mixed-berry.jpg')),
  'banana-chips': getBase64(path.join(rootDir, 'public/products/banana-chips.jpg')),
  'pumpkin': getBase64(path.join(rootDir, 'public/products/pumpkin.jpg')),
  'mango': getBase64(path.join(rootDir, 'public/products/mango.jpg')),
  'matcha': getBase64(path.join(rootDir, 'public/products/matcha.jpg')),
  'protein': getBase64(path.join(rootDir, 'public/products/protein.jpg')),
  'apple': getBase64(path.join(rootDir, 'public/products/apple.jpg')),
  'dark-cocoa': getBase64(path.join(rootDir, 'public/products/dark-cocoa.jpg')),
  'pineapple': getBase64(path.join(rootDir, 'public/products/pineapple.jpg')),
  'berry-cookies': getBase64(path.join(rootDir, 'public/products/berry-cookies.jpg')),
  'super-mix': getBase64(path.join(rootDir, 'public/products/super-mix.jpg')),
};

const productsData = [
  {
    id: 1,
    nameTh: "นิบบลี่ เบอร์รี่ กราโนล่า",
    nameEn: "NIBBLY Berry Granola",
    slug: "nibbly-berry-granola",
    art: "berry-granola",
    category: "Granola (กราโนล่า)",
    price: 149,
    badge: "BEST SELLER",
    rating: 4.9,
    reviews: 184,
    description: "คลัสเตอร์ข้าวโอ๊ตกรุบกรอบรสเปรี้ยวอมหวาน ผสานสตรอว์เบอร์รี บลูเบอร์รีแท้ และอัลมอนด์ อบด้วยลมร้อน ไม่ใช้น้ำตาลทรายขาว",
    ingredients: ["ข้าวโอ๊ตเต็มเมล็ด (Oats)", "สตรอว์เบอร์รีแท้ (Strawberry)", "บลูเบอร์รีแท้ (Blueberry)", "อัลมอนด์ (Almond)"],
    benefits: ["ไฟเบอร์สูงช่วยระบบขับถ่าย (High Fibre)", "ผลไม้แท้ให้วิตามินซี (Real Fruit)", "ปราศจากน้ำตาลทรายขาว (No Refined Sugar)"],
    allergens: ["อัลมอนด์ (Almond)", "กลูเตน (Gluten)"],
    perfectFor: ["มื้อเช้าเพิ่มพลัง (Morning Snack)", "ทานระหว่างอ่านหนังสือ/ทำงาน (Study/Work)"],
    nutrition: { cal: "175 kcal", protein: "5g", fibre: "5g", sugar: "7g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 2,
    nameTh: "ฮันนี่ อัลมอนด์ ครันช์",
    nameEn: "Honey Almond Crunch",
    slug: "honey-almond-crunch",
    art: "honey",
    category: "Granola (กราโนล่า)",
    price: 139,
    badge: "POPULAR",
    rating: 4.9,
    reviews: 156,
    description: "อัลมอนด์แคลิฟอร์เนียคั่วทอง เคลือบน้ำผึ้งดอกไม้ป่าแท้และเกล็ดมะพร้าวหอมละมุน อบแบบ Small-Batch กรอบฟินทุกคำ",
    ingredients: ["อัลมอนด์ (Almond)", "ข้าวโอ๊ต (Oats)", "น้ำผึ้งป่าธรรมชาติ (Honey)", "มะพร้าวอบกรอบ (Coconut)"],
    benefits: ["พลังงานสะอาดจากธรรมชาติ (Plant-Powered)", "แหล่งไฟเบอร์และไขมันดี (Source of Fibre)", "อบสดใหม่ลอตเล็กคงคุณค่า"],
    allergens: ["อัลมอนด์ (Almond)", "กลูเตน (Gluten)"],
    perfectFor: ["คนทำงานออฟฟิศ (Work)", "พกพาท่องเที่ยวเดินทาง (Travel)"],
    nutrition: { cal: "180 kcal", protein: "5g", fibre: "4g", sugar: "7g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 3,
    nameTh: "ทรอปิคอล ฟรุต มิกซ์",
    nameEn: "Tropical Fruit Mix",
    slug: "tropical-fruit-mix",
    art: "tropical",
    category: "Dried Fruits (ผลไม้อบแห้ง)",
    price: 135,
    badge: "VEGAN",
    rating: 4.8,
    reviews: 92,
    description: "รวมพลังผลไม้เมืองร้อนแท้ 100% มะม่วง สับปะรด กล้วยหอม และมะพร้าว เคี้ยวหนึบ หวานธรรมชาติ ไม่ผสมน้ำเชื่อม",
    ingredients: ["มะม่วงอบแห้ง (Dried Mango)", "สับปะรดอบแห้ง (Pineapple)", "กล้วยอบแห้ง (Banana)", "มะพร้าว (Coconut)"],
    benefits: ["ผลไม้แท้ 100% ไม่แต่งกลิ่นสี", "หวานธรรมชาติปราศจากไซรัป (Naturally Sweet)", "วิตามินซีสูงเสริมภูมิคุ้มกัน (Vitamin C)"],
    allergens: ["อาจมีละอองถั่วเปลือกแข็ง (May contain tree nuts)"],
    perfectFor: ["พกพาระหว่างเดินทาง (Travel)", "ของว่างมื้อสายคลายหิว (Morning Snack)"],
    nutrition: { cal: "150 kcal", protein: "2g", fibre: "4g", sugar: "10g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 4,
    nameTh: "บานาน่า โอ๊ต ไบท์",
    nameEn: "Banana Oat Bites",
    slug: "banana-oat-bites",
    art: "banana",
    category: "Energy Bites (เอเนอร์จี้ไบต์)",
    price: 119,
    badge: "HEALTHY PICK",
    rating: 4.8,
    reviews: 119,
    description: "ไบท์กล้วยหอมผสมข้าวโอ๊ตเนื้อนุ่มหนึบ หวานละมุนจากอินทผาลัม หอมมันอัลมอนด์ อบไม่ทอด แคลอรีเบาสบายท้อง",
    ingredients: ["กล้วยหอมทอง (Banana)", "ข้าวโอ๊ตเต็มเมล็ด (Oats)", "อัลมอนด์ (Almond)", "อินทผาลัม (Date)"],
    benefits: ["ข้าวโอ๊ตเต็มเมล็ดอิ่มนาน (Whole Grain)", "อบลมร้อนไม่ใช้น้ำมัน (Baked, Not Fried)", "พกพาสะดวกหยิบทานง่าย"],
    allergens: ["อัลมอนด์ (Almond)", "กลูเตน (Gluten)"],
    perfectFor: ["อ่านหนังสือเตรียมสอบ (Study)", "เติมพลังก่อน-หลังออกกำลังกาย (Workout)"],
    nutrition: { cal: "160 kcal", protein: "3g", fibre: "4g", sugar: "6g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 5,
    nameTh: "สตรอว์เบอร์รี โยเกิร์ต ไบท์",
    nameEn: "Strawberry Yogurt Bites",
    slug: "strawberry-yogurt-bites",
    art: "strawberry-yogurt",
    category: "Fruit Snacks (ผลไม้อบกรอบโยเกิร์ต)",
    price: 129,
    badge: "NEW",
    rating: 4.7,
    reviews: 78,
    description: "สตรอว์เบอร์รีแท้ฟรีซดรายเคลือบโยเกิร์ตสดรสละมุน กรอบฟู ละลายในปาก เปรี้ยวอมหวานสดชื่น มีโพรไบโอติกส์",
    ingredients: ["สตรอว์เบอร์รีฟรีซดราย (Strawberry)", "โยเกิร์ตสดแท้ (Yogurt)", "ข้าวพองกรอบ (Rice crisps)"],
    benefits: ["รสเบอร์รี่สดชื่นหวานละมุน", "เนื้อสัมผัสกรอบฟูละลายในปาก", "มีจุลินทรีย์ดีต่อลำไส้"],
    allergens: ["นมวัวและผลิตภัณฑ์จากนม (Milk)"],
    perfectFor: ["ทานเล่นระหว่างทำงาน (Work)", "ของว่างพักผ่อนดูซีรีส์ (Movie Night)"],
    nutrition: { cal: "145 kcal", protein: "3g", fibre: "2g", sugar: "9g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 6,
    nameTh: "บลูเบอร์รี นัต มิกซ์",
    nameEn: "Blueberry Nut Mix",
    slug: "blueberry-nut-mix",
    art: "blueberry",
    category: "Nut Mix (ถั่วและผลไม้รวม)",
    price: 145,
    badge: "BEST SELLER",
    rating: 4.9,
    reviews: 106,
    description: "การรวมตัวของบลูเบอร์รีฉ่ำหวาน อัลมอนด์ เม็ดมะม่วงหิมพานต์คั่วหอม และเมล็ดฟักทอง อุดมด้วยแอนโทไซยานินและไขมันดี",
    ingredients: ["บลูเบอร์รีอบแห้ง (Blueberry)", "อัลมอนด์ (Almond)", "เม็ดมะม่วงหิมพานต์ (Cashew)", "เมล็ดฟักทอง (Pumpkin seeds)"],
    benefits: ["ไขมันดีไม่อิ่มตัวบำรุงหัวใจ (Good Fats)", "สารต้านอนุมูลอิสระชะลอวัย (Antioxidant-Rich)", "เสริมโปรตีนและแร่ธาตุ"],
    allergens: ["อัลมอนด์ (Almond)", "เม็ดมะม่วงหิมพานต์ (Cashew)"],
    perfectFor: ["คนทำงานใช้สายตาและสมอง (Work)", "พกติดกระเป๋าเดินทาง (Travel)"],
    nutrition: { cal: "170 kcal", protein: "5g", fibre: "4g", sugar: "8g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 7,
    nameTh: "แคชชู ฮันนี่ ไบท์",
    nameEn: "Cashew Honey Bites",
    slug: "cashew-honey-bites",
    art: "cashew",
    category: "Energy Bites (เอเนอร์จี้ไบต์)",
    price: 129,
    badge: "POPULAR",
    rating: 4.7,
    reviews: 63,
    description: "เอเนอร์จี้ไบต์เนื้อหนึบจากเม็ดมะม่วงหิมพานต์บด น้ำผึ้งธรรมชาติ ข้าวโอ๊ต และเมล็ดเจีย ให้พลังงานต่อเนื่องไม่สะดุด",
    ingredients: ["เม็ดมะม่วงหิมพานต์ (Cashew)", "น้ำผึ้งป่า (Honey)", "ข้าวโอ๊ต (Oats)", "เมล็ดเจีย (Chia)"],
    benefits: ["เติมพลังงานอย่างเป็นธรรมชาติ (Naturally Energising)", "อุดมด้วยโอเมก้า 3 จากเมล็ดเจีย (With Chia)", "ไม่แต่งกลิ่นและสีสังเคราะห์"],
    allergens: ["เม็ดมะม่วงหิมพานต์ (Cashew)", "กลูเตน (Gluten)"],
    perfectFor: ["เพิ่มพลังก่อนออกกำลังกาย (Workout)", "ของว่างมื้อสายเติมความสดชื่น (Morning Snack)"],
    nutrition: { cal: "165 kcal", protein: "4g", fibre: "3g", sugar: "7g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 8,
    nameTh: "ช็อกโก โอ๊ต ครันช์",
    nameEn: "Choco Oat Crunch",
    slug: "choco-oat-crunch",
    art: "choco",
    category: "Oat Snacks (โอ๊ตช็อกโกแลต)",
    price: 139,
    badge: "POPULAR",
    rating: 4.8,
    reviews: 111,
    description: "ดาร์กโกโก้เข้มข้นแท้ ผสานข้าวโอ๊ตกรุบกรอบ อัลมอนด์ และความหวานธรรมชาติจากอินทผาลัม หวานน้อย เข้มข้น ไม่รู้สึกผิด",
    ingredients: ["ข้าวโอ๊ต (Oats)", "ผงดาร์กโกโก้แท้ (Cocoa)", "อัลมอนด์ (Almond)", "อินทผาลัม (Date)"],
    benefits: ["ฟลาโวนอยด์จากโกโก้บำรุงสมอง", "พลังงานคาร์บเชิงซ้อนอิ่มยาวนาน", "อบกรอบสูตรคลีนไม่ใช้น้ำมัน"],
    allergens: ["อัลมอนด์ (Almond)", "กลูเตน (Gluten)"],
    perfectFor: ["คนอ่านหนังสือสอบ (Study)", "แก้ง่วงยามบ่ายที่ออฟฟิศ (Work)"],
    nutrition: { cal: "172 kcal", protein: "4g", fibre: "4g", sugar: "6g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 9,
    nameTh: "โคโค่นัท อัลมอนด์ กราโนล่า",
    nameEn: "Coconut Almond Granola",
    slug: "coconut-almond-granola",
    art: "coconut",
    category: "Granola (กราโนล่า)",
    price: 149,
    badge: "VEGAN",
    rating: 4.7,
    reviews: 71,
    description: "มะพร้าวอบกรอบแผ่นบางเคลือบเมเปิ้ลไซรัปแท้ คลุกเคล้าอัลมอนด์และข้าวโอ๊ตคลัสเตอร์สีทอง หอมมันสไตล์เมืองร้อน ปราศจากนม 100%",
    ingredients: ["ข้าวโอ๊ต (Oats)", "เกล็ดมะพร้าวอบ (Coconut)", "อัลมอนด์ (Almond)", "เมเปิ้ลไซรัปบริสุทธิ์ (Maple syrup)"],
    benefits: ["สูตรเจ/วีแกน 100% ไร้นมเนย (Dairy-Free)", "ใยอาหารสูงช่วยระบบย่อย (High Fibre)", "คลัสเตอร์กรอบนานไม่นิ่ม"],
    allergens: ["อัลมอนด์ (Almond)", "กลูเตน (Gluten)"],
    perfectFor: ["อาหารเช้าคู่โยเกิร์ตพืช (Morning Snack)", "พกพาไปแคมป์ปิ้งหรือเที่ยว (Travel)"],
    nutrition: { cal: "178 kcal", protein: "5g", fibre: "5g", sugar: "6g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 10,
    nameTh: "มิกซ์เบอร์รี่ เอเนอร์จี้ ไบท์",
    nameEn: "Mixed Berry Energy Bites",
    slug: "mixed-berry-energy-bites",
    art: "mixed-berry",
    category: "Energy Bites (เอเนอร์จี้ไบต์)",
    price: 129,
    badge: "NEW",
    rating: 4.8,
    reviews: 94,
    description: "รวมคุณค่า 3 เบอร์รี่ สตรอว์เบอร์รี บลูเบอร์รี และราสเบอร์รี ในโอ๊ตไบท์ขนาดพอดีคำ เปรี้ยวหวานสดใส เติมวิตามินซีและความสดชื่น",
    ingredients: ["สตรอว์เบอร์รี (Strawberry)", "บลูเบอร์รี (Blueberry)", "ราสเบอร์รี (Raspberry)", "ข้าวโอ๊ต (Oats)"],
    benefits: ["เบอร์รี่แท้ 100% วิตามินซีสูง (Real Berries)", "ขนาดพอดีคำพกพาสะดวก (Pocket-Friendly)", "สีสันสวยงามจากผลไม้ธรรมชาติ"],
    allergens: ["กลูเตน (Gluten)"],
    perfectFor: ["นักเรียนนักศึกษาอ่านหนังสือ (Study)", "ทานรองท้องก่อนไปยิม (Workout)"],
    nutrition: { cal: "158 kcal", protein: "3g", fibre: "4g", sugar: "7g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 11,
    nameTh: "บานาน่า ซินนามอน ชิปส์",
    nameEn: "Banana Cinnamon Chips",
    slug: "banana-cinnamon-chips",
    art: "banana-chips",
    category: "Dried Fruits (ผลไม้อบแห้ง)",
    price: 109,
    badge: "VEGAN",
    rating: 4.6,
    reviews: 58,
    description: "กล้วยน้ำว้าอบกรอบแผ่นบาง โรยผงอบเชยซีลอนหอมละมุน อบด้วยน้ำมันมะพร้าวบริสุทธิ์ กรอบเบา ไม่แข็ง ไม่อมน้ำมัน",
    ingredients: ["กล้วยน้ำว้าแท้ (Banana)", "ผงอบเชยแท้ (Cinnamon)", "น้ำมันมะพร้าวบริสุทธิ์ (Coconut oil)"],
    benefits: ["กรอบเบาเคี้ยวเพลิน (Crunchy & Light)", "พลังงานโพแทสเซียมจากกล้วย (Fruit-Powered)", "ไม่เติมน้ำตาลทรายขาว (No Added Sugar)"],
    allergens: ["อาจมีละอองถั่วเปลือกแข็ง (May contain tree nuts)"],
    perfectFor: ["ทานเพลินระหว่างขับรถหรือเดินทาง (Travel)", "ของว่างดูภาพยนตร์ (Movie Night)"],
    nutrition: { cal: "140 kcal", protein: "1g", fibre: "3g", sugar: "8g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 12,
    nameTh: "พัมพ์กิน ซีด ครันช์",
    nameEn: "Pumpkin Seed Crunch",
    slug: "pumpkin-seed-crunch",
    art: "pumpkin",
    category: "Healthy Snacks (เมล็ดธัญพืชอบ)",
    price: 135,
    badge: "HEALTHY PICK",
    rating: 4.7,
    reviews: 66,
    description: "เมล็ดฟักทองและเมล็ดทานตะวันคั่วไฟอ่อน คลุกเคล้าเมล็ดแฟลกซ์และโอ๊ตคลัสเตอร์ เค็มนิดหวานหน่อย มันกรุบกรอบ โปรตีนและแร่ธาตุสังกะสีสูง",
    ingredients: ["เมล็ดฟักทอง (Pumpkin seeds)", "เมล็ดทานตะวัน (Sunflower seeds)", "ข้าวโอ๊ต (Oats)", "เมล็ดแฟลกซ์ (Flaxseed)"],
    benefits: ["พลังงานจากซูเปอร์ซีดส์ (Seed-Powered)", "ไฟเบอร์สูงและแร่ธาตุสังกะสีช่วยภูมิคุ้มกัน", "รสสัมผัสกรอบมันกลมกล่อม"],
    allergens: ["กลูเตน (Gluten)"],
    perfectFor: ["คนทำงานออฟฟิศเคี้ยวแก้ง่วง (Work)", "เสริมเกลือแร่หลังออกกำลังกาย (Workout)"],
    nutrition: { cal: "165 kcal", protein: "6g", fibre: "5g", sugar: "3g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 13,
    nameTh: "แมงโก้ แคชชู มิกซ์",
    nameEn: "Mango Cashew Mix",
    slug: "mango-cashew-mix",
    art: "mango",
    category: "Nut Mix (ถั่วและผลไม้รวม)",
    price: 145,
    badge: "LIMITED",
    rating: 4.8,
    reviews: 87,
    description: "มะม่วงมหาชนกอบแห้งเนื้อฉ่ำหวานอมเปรี้ยว เข้ากันได้อย่างยอดเยี่ยมกับเม็ดมะม่วงหิมพานต์คั่วและอัลมอนด์กรุบกรอบ รสชาติเข้มข้นโดนใจ",
    ingredients: ["มะม่วงอบแห้ง (Dried Mango)", "เม็ดมะม่วงหิมพานต์ (Cashew)", "อัลมอนด์ (Almond)"],
    benefits: ["พลังงานทรอปิคอลเพิ่มความสดชื่น", "กรดไขมันดีไม่อิ่มตัวสูง (Good Fats)", "รสชาติเข้มข้นลงตัว"],
    allergens: ["เม็ดมะม่วงหิมพานต์ (Cashew)", "อัลมอนด์ (Almond)"],
    perfectFor: ["พกพาเดินทาง (Travel)", "ของว่างเติมพลังยามบ่าย (Afternoon Snack)"],
    nutrition: { cal: "174 kcal", protein: "4g", fibre: "3g", sugar: "9g" },
    status: "Limited (จำนวนจำกัด)"
  },
  {
    id: 14,
    nameTh: "กรีน มัทฉะ โอ๊ต ไบท์",
    nameEn: "Green Matcha Oat Bites",
    slug: "green-matcha-oat-bites",
    art: "matcha",
    category: "Energy Bites (เอเนอร์จี้ไบต์)",
    price: 139,
    badge: "VEGAN",
    rating: 4.8,
    reviews: 77,
    description: "ผงมัทฉะเกรดพิธีการจากชิซูโอกะ ประเทศญี่ปุ่น ผสานข้าวโอ๊ต อัลมอนด์ และอินทผาลัม หอมกลิ่นชาเขียวแท้ มีแอล-ธีอะนีนช่วยเพิ่มสมาธิอย่างสงบ",
    ingredients: ["ข้าวโอ๊ต (Oats)", "ผงมัทฉะแท้ (Matcha)", "อัลมอนด์ (Almond)", "อินทผาลัม (Date)"],
    benefits: ["แอล-ธีอะนีนช่วยให้สมองโฟกัสผ่อนคลาย (Matcha Lift)", "ธัญพืชเต็มเมล็ดไม่ผ่านการฟอก (Whole Grains)", "หวานธรรมชาติจากอินทผาลัม"],
    allergens: ["อัลมอนด์ (Almond)", "กลูเตน (Gluten)"],
    perfectFor: ["อ่านหนังสือและติวข้อสอบ (Study)", "ทำงานที่ต้องการสมาธิสูง (Work)"],
    nutrition: { cal: "154 kcal", protein: "3g", fibre: "4g", sugar: "6g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 15,
    nameTh: "พีนัต บัตเตอร์ โปรตีน ไบท์",
    nameEn: "Peanut Butter Protein Bites",
    slug: "peanut-butter-protein-bites",
    art: "protein",
    category: "Protein Snacks (สแน็กโปรตีนสูง)",
    price: 159,
    badge: "HEALTHY PICK",
    rating: 4.9,
    reviews: 125,
    description: "เนยถั่วลิสงคั่วบดแท้ 100% ผสมโปรตีนถั่วลันเตา เมล็ดเจีย และข้าวโอ๊ต โปรตีนแน่นถึง 8g ต่อหน่วยบริโภค หนึบหนับ อยู่ท้อง ไม่ใส่น้ำตาล",
    ingredients: ["ข้าวโอ๊ต (Oats)", "เนยถั่วลิสงแท้ (Peanut butter)", "โปรตีนถั่วลันเตา (Pea protein)", "เมล็ดเจียและเมล็ดแฟลกซ์ (Seeds)"],
    benefits: ["โปรตีนสูง 8g เสริมสร้างกล้ามเนื้อ", "อยู่ท้องยาวนานลดความอยากอาหารจุกจิก", "โปรตีนจากพืชย่อยง่ายไม่ทำให้ท้องอืด"],
    allergens: ["ถั่วลิสง (Peanut)", "กลูเตน (Gluten)"],
    perfectFor: ["นักออกกำลังกายและเข้าฟิตเนส (Workout)", "มื้อเช้าเร่งด่วนเพิ่มโปรตีน (Morning Snack)"],
    nutrition: { cal: "190 kcal", protein: "8g", fibre: "4g", sugar: "5g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 16,
    nameTh: "แอปเปิ้ล ซินนามอน กราโนล่า",
    nameEn: "Apple Cinnamon Granola",
    slug: "apple-cinnamon-granola",
    art: "apple",
    category: "Granola (กราโนล่า)",
    price: 149,
    badge: "POPULAR",
    rating: 4.7,
    reviews: 68,
    description: "เนื้อแอปเปิ้ลแท้อบแห้งชิ้นพอดีคำ คลุกเคล้าผงอบเชยหอมอบอุ่น อัลมอนด์ และข้าวโอ๊ตคลัสเตอร์ ฟีลลิ่งเหมือนพายแอปเปิ้ลอบใหม่สไตล์โฮมเมด",
    ingredients: ["เนื้อแอปเปิ้ลแห้ง (Apple)", "ข้าวโอ๊ต (Oats)", "ผงอบเชย (Cinnamon)", "อัลมอนด์ (Almond)"],
    benefits: ["ใยอาหารสูงช่วยระบบขับถ่ายสบายพุง (High Fibre)", "กลิ่นอบเชยหอมอบอุ่นผ่อนคลาย (Warm & Cozy)", "แอปเปิ้ลแท้ 100% ไม่แต่งกลิ่น"],
    allergens: ["อัลมอนด์ (Almond)", "กลูเตน (Gluten)"],
    perfectFor: ["มื้อเช้าผสมนมหรือโยเกิร์ต (Morning Snack)", "ทานคู่ชาร้อนระหว่างอ่านหนังสือ (Study)"],
    nutrition: { cal: "176 kcal", protein: "4g", fibre: "5g", sugar: "7g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 17,
    nameTh: "ดาร์ก โกโก้ นัต มิกซ์",
    nameEn: "Dark Cocoa Nut Mix",
    slug: "dark-cocoa-nut-mix",
    art: "dark-cocoa",
    category: "Nut Mix (ถั่วเคลือบดาร์กโกโก้)",
    price: 155,
    badge: "LIMITED",
    rating: 4.8,
    reviews: 98,
    description: "ถั่ว 3 พรีเมียม อัลมอนด์ เม็ดมะม่วงหิมพานต์ และเฮเซลนัท อบกรอบไร้น้ำมัน คลุกผงดาร์กโกโก้แท้เกรดพรีเมียม เข้มสะใจ ไม่หวานเลี่ยน",
    ingredients: ["ผงดาร์กโกโก้แท้ (Cocoa)", "อัลมอนด์ (Almond)", "เม็ดมะม่วงหิมพานต์ (Cashew)", "เฮเซลนัท (Hazelnut)"],
    benefits: ["ฟลาโวนอยด์จากโกโก้แท้ต้านอนุมูลอิสระ", "ไขมันดี HDL สูงจากถั่ว 3 ชนิด", "กรุบกรอบเคี้ยวเพลินไร้น้ำมัน"],
    allergens: ["อัลมอนด์ (Almond)", "เม็ดมะม่วงหิมพานต์ (Cashew)", "เฮเซลนัท (Hazelnut)"],
    perfectFor: ["คนทำงานดึกต้องการสมาธิ (Work)", "ขนมเคี้ยวเพลินดูหนัง (Movie Night)"],
    nutrition: { cal: "185 kcal", protein: "5g", fibre: "3g", sugar: "6g" },
    status: "Limited (จำนวนจำกัด)"
  },
  {
    id: 18,
    nameTh: "ไพน์แอปเปิ้ล โคโค่นัท ไบท์",
    nameEn: "Pineapple Coconut Bites",
    slug: "pineapple-coconut-bites",
    art: "pineapple",
    category: "Energy Bites (เอเนอร์จี้ไบต์)",
    price: 129,
    badge: "VEGAN",
    rating: 4.7,
    reviews: 61,
    description: "สัมผัสความสดชื่นสไตล์ทรอปิคอลจากสับปะรดแท้รสเปรี้ยวอมหวาน มะพร้าวคั่วหอมมัน ข้าวโอ๊ต และเม็ดมะม่วงหิมพานต์ สดชื่น ปลุกพลังยามบ่าย",
    ingredients: ["สับปะรดอบแห้ง (Pineapple)", "เกล็ดมะพร้าว (Coconut)", "ข้าวโอ๊ต (Oats)", "เม็ดมะม่วงหิมพานต์ (Cashew)"],
    benefits: ["รสผลไม้เมืองร้อนสดชื่นคลายง่วง", "ความหวานธรรมชาติจากผลไม้ล้วนๆ", "พลังงานสะอาดวีแกน 100% ไร้นมเนย"],
    allergens: ["เม็ดมะม่วงหิมพานต์ (Cashew)", "กลูเตน (Gluten)"],
    perfectFor: ["พกพาระหว่างเดินทางท่องเที่ยว (Travel)", "เติมพลังก่อนวิ่งหรือออกกำลังกาย (Workout)"],
    nutrition: { cal: "162 kcal", protein: "3g", fibre: "3g", sugar: "8g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 19,
    nameTh: "เบอร์รี่ โอ๊ต คุกกี้",
    nameEn: "Berry Oat Cookies",
    slug: "berry-oat-cookies",
    art: "berry-cookies",
    category: "Healthy Cookies (คุกกี้สุขภาพ)",
    price: 125,
    badge: "NEW",
    rating: 4.7,
    reviews: 73,
    description: "คุกกี้ข้าวโอ๊ตอบนุ่ม Soft-Baked สอดไส้ชิ้นเบอร์รี่รวมหนึบหนับ อัลมอนด์บด และความหวานละมุนจากน้ำตาลมะพร้าวธรรมชาติ แคลต่ำไฟเบอร์ดี",
    ingredients: ["ข้าวโอ๊ต (Oats)", "เบอร์รี่รวม (Berry)", "อัลมอนด์ (Almond)", "น้ำตาลมะพร้าว (Coconut sugar)"],
    benefits: ["อบนุ่มละมุนไม่แข็งกระด้าง (Soft-Baked)", "ธัญพืชเต็มเมล็ดไม่ผ่านการขัดสี", "รสชาติเบอร์รี่ชุ่มฉ่ำทุกคำ"],
    allergens: ["อัลมอนด์ (Almond)", "กลูเตน (Gluten)"],
    perfectFor: ["ทานเป็นของว่างระหว่างอ่านหนังสือ (Study)", "ทานคู่กาแฟหรือชาแก้ง่วง (Coffee Break)"],
    nutrition: { cal: "168 kcal", protein: "3g", fibre: "3g", sugar: "8g" },
    status: "Available (พร้อมจำหน่าย)"
  },
  {
    id: 20,
    nameTh: "นิบบลี่ ซูเปอร์ สแน็ก มิกซ์",
    nameEn: "NIBBLY Super Snack Mix",
    slug: "nibbly-super-snack-mix",
    art: "super-mix",
    category: "Trail Mix (เทรลมิกซ์รวมดาว)",
    price: 169,
    badge: "BEST SELLER",
    rating: 4.9,
    reviews: 204,
    description: "ซิกเนเจอร์มิกซ์ที่รวม 7 ซูเปอร์ฟู้ดส์: อัลมอนด์ วอลนัท เม็ดมะม่วงหิมพานต์ บลูเบอร์รี แครนเบอร์รี เมล็ดฟักทอง และโอ๊ตคลัสเตอร์ ครบทุกสารอาหารในซองเดียว",
    ingredients: ["อัลมอนด์ (Almond)", "เม็ดมะม่วงหิมพานต์ (Cashew)", "วอลนัท (Walnut)", "บลูเบอร์รี (Blueberry)", "แครนเบอร์รี (Cranberry)", "เมล็ดฟักทอง (Pumpkin seeds)", "ข้าวโอ๊ต (Oats)"],
    benefits: ["รวมคุณค่าอาหารครบจบในซองเดียว (Everything Mix)", "โปรตีน 6g และไฟเบอร์สูง 5g", "อุดมด้วยโอเมก้า 3 บำรุงสมองและหัวใจ"],
    allergens: ["อัลมอนด์ (Almond)", "เม็ดมะม่วงหิมพานต์ (Cashew)", "วอลนัท (Walnut)", "กลูเตน (Gluten)"],
    perfectFor: ["คนทำงานออฟฟิศ (Work)", "อ่านหนังสือเตรียมสอบ (Study)", "เดินทางท่องเที่ยว (Travel)", "ฟื้นฟูกล้ามเนื้อหลังออกกำลังกาย (Workout)"],
    nutrition: { cal: "188 kcal", protein: "6g", fibre: "5g", sugar: "7g" },
    status: "Available (พร้อมจำหน่าย)"
  }
];

const htmlContent = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>NIBBLY Healthy Treats - LINE AI Chatbot Knowledge Base</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700;800&family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Mali:wght@500;600;700&display=swap');

    @page {
      size: A4 portrait;
      margin: 14mm 12mm 16mm 12mm;
      @bottom-right {
        content: counter(page);
        font-family: 'Prompt', sans-serif;
        font-size: 9pt;
        color: #7A664F;
      }
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #2D3748;
      background: #FFFFFF;
      line-height: 1.5;
      font-size: 10.5pt;
      margin: 0;
      padding: 0;
    }

    /* Colors Definition */
    :root {
      --primary: #354B2D;
      --primary-light: #527345;
      --biscuit: #F1E5CD;
      --cream: #FFF9E9;
      --berry-pink: #FF718D;
      --berry: #FF3366;
      --honey: #FFD95A;
      --orange: #E6A15C;
      --matcha: #8BC34A;
      --teal: #62BFA1;
      --text-dark: #263820;
      --border-soft: #E8DCC8;
    }

    .page-break {
      page-break-before: always;
      break-before: page;
    }

    .avoid-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Header Bar on printed pages */
    .section-header-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 6px;
      margin-bottom: 16px;
    }
    .section-header-banner .title {
      font-size: 15pt;
      font-weight: 800;
      color: var(--primary);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-header-banner .badge {
      background: var(--cream);
      border: 1px solid var(--biscuit);
      color: var(--primary);
      font-size: 8pt;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 999px;
    }

    /* COVER PAGE */
    .cover-container {
      height: 100%;
      min-height: 980px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      padding: 40px 20px 20px;
      background: radial-gradient(circle at 50% 20%, #FFFDF7 0%, #FAF0DF 100%);
      border: 4px solid var(--biscuit);
      border-radius: 28px;
      position: relative;
      overflow: hidden;
    }

    .cover-top-tag {
      background: var(--primary);
      color: #FFFFFF;
      font-size: 11pt;
      font-weight: 700;
      padding: 6px 24px;
      border-radius: 999px;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px rgba(53, 75, 45, 0.2);
    }

    .cover-logo {
      max-width: 320px;
      max-height: 140px;
      margin: 15px auto;
    }

    .cover-title {
      font-family: 'Fredoka', 'Prompt', sans-serif;
      font-size: 32pt;
      font-weight: 800;
      color: var(--primary);
      line-height: 1.15;
      margin: 10px 0 6px;
    }

    .cover-subtitle {
      font-size: 16pt;
      font-weight: 700;
      color: #795548;
      margin-bottom: 8px;
    }

    .cover-slogan {
      display: inline-block;
      background: linear-gradient(135deg, #FFEBEF 0%, #FFF1D6 100%);
      border: 2px dashed var(--berry-pink);
      color: var(--berry);
      font-size: 13pt;
      font-weight: 800;
      padding: 8px 24px;
      border-radius: 999px;
      margin: 8px 0 20px;
    }

    .cover-visuals {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin: 15px 0;
    }
    .cover-circle-img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 5px solid #FFFFFF;
      box-shadow: 0 10px 25px rgba(80, 50, 20, 0.15);
      object-fit: cover;
      background: #FFFFFF;
    }

    .cover-card-info {
      background: rgba(255, 255, 255, 0.92);
      border: 2px solid var(--biscuit);
      border-radius: 20px;
      padding: 16px 24px;
      width: 100%;
      max-width: 580px;
      margin: 15px auto;
      text-align: left;
      font-size: 9.5pt;
      box-shadow: 0 6px 18px rgba(90, 60, 20, 0.06);
    }
    .cover-card-info table {
      width: 100%;
      border-collapse: collapse;
    }
    .cover-card-info td {
      padding: 4px 6px;
    }
    .cover-card-info td.label {
      font-weight: 700;
      color: var(--primary);
      width: 32%;
    }

    .cover-footer {
      font-size: 9pt;
      color: #8C7862;
      border-top: 1px dashed #D6C2A7;
      padding-top: 10px;
      width: 100%;
    }

    /* Table of Contents */
    .toc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 14px;
    }
    .toc-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #FFFDF9;
      border: 1px solid var(--border-soft);
      border-radius: 12px;
      padding: 8px 12px;
      font-size: 9.5pt;
    }
    .toc-item .num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: var(--primary);
      color: #fff;
      font-weight: 800;
      border-radius: 50%;
      font-size: 8pt;
      margin-right: 8px;
    }
    .toc-item .name {
      font-weight: 600;
      color: var(--text-dark);
      flex: 1;
    }

    /* General Typography & Components */
    h2 {
      font-size: 13.5pt;
      font-weight: 800;
      color: var(--primary);
      margin: 14px 0 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    h3 {
      font-size: 11pt;
      font-weight: 700;
      color: #3D2B1F;
      margin: 10px 0 4px;
    }
    p {
      margin: 4px 0 8px;
      color: #3B424C;
    }

    .info-box {
      background: var(--cream);
      border-left: 4px solid var(--primary);
      border-radius: 8px;
      padding: 10px 14px;
      margin: 10px 0;
      font-size: 9.5pt;
    }
    .alert-box {
      background: #FFF0F3;
      border-left: 4px solid var(--berry);
      border-radius: 8px;
      padding: 10px 14px;
      margin: 10px 0;
      font-size: 9.5pt;
      color: #8A1333;
    }
    .highlight-box {
      background: #F0F9F5;
      border-left: 4px solid var(--teal);
      border-radius: 8px;
      padding: 10px 14px;
      margin: 10px 0;
      font-size: 9.5pt;
      color: #174F3F;
    }

    /* Product Catalog Card */
    .product-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 10px;
    }
    .product-card {
      border: 1.5px solid var(--border-soft);
      border-radius: 16px;
      padding: 10px 12px;
      background: #FFFFFF;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-inside: avoid;
      box-shadow: 0 3px 8px rgba(0,0,0,0.03);
    }
    .product-card-header {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }
    .product-thumb {
      width: 72px;
      height: 72px;
      border-radius: 12px;
      border: 2px solid var(--biscuit);
      object-fit: cover;
      flex-shrink: 0;
      background: #FAF7F2;
    }
    .product-meta {
      flex: 1;
    }
    .product-badge {
      display: inline-block;
      font-size: 7pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 999px;
      margin-bottom: 2px;
      text-transform: uppercase;
    }
    .badge-bestseller { background: #FEE2E2; color: #991B1B; }
    .badge-popular { background: #FEF3C7; color: #92400E; }
    .badge-healthypick { background: #DCFCE7; color: #166534; }
    .badge-vegan { background: #E0E7FF; color: #3730A3; }
    .badge-new { background: #FCE7F3; color: #9D174D; }
    .badge-limited { background: #EDE9FE; color: #5B21B6; }

    .product-name-th {
      font-size: 10.5pt;
      font-weight: 800;
      color: var(--primary);
      line-height: 1.2;
    }
    .product-name-en {
      font-size: 8pt;
      color: #718096;
      font-style: italic;
    }
    .product-price {
      font-size: 11pt;
      font-weight: 800;
      color: var(--berry);
      margin-top: 2px;
    }

    .product-desc {
      font-size: 8.5pt;
      color: #4A5568;
      margin: 6px 0;
      line-height: 1.35;
    }

    .product-nutrition-pills {
      display: flex;
      gap: 4px;
      background: var(--cream);
      border: 1px solid var(--biscuit);
      border-radius: 8px;
      padding: 4px 6px;
      margin: 4px 0;
      justify-content: space-around;
      font-size: 7.5pt;
      text-align: center;
    }
    .product-nutrition-pills .nut-item strong {
      display: block;
      color: var(--primary);
      font-size: 8pt;
    }

    .product-details-list {
      font-size: 8pt;
      color: #4A5568;
      margin-top: 4px;
      line-height: 1.3;
    }
    .product-details-list li {
      margin-bottom: 2px;
    }

    /* Comparison Table */
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 8.5pt;
    }
    table.data-table th {
      background: var(--primary);
      color: #FFFFFF;
      padding: 7px 8px;
      font-weight: 700;
      text-align: left;
      border: 1px solid var(--primary);
    }
    table.data-table td {
      padding: 6px 8px;
      border: 1px solid #E2E8F0;
      vertical-align: top;
    }
    table.data-table tr:nth-child(even) {
      background: #FDFBF7;
    }

    /* FAQ List */
    .faq-item {
      margin-bottom: 10px;
      border-bottom: 1px dashed var(--biscuit);
      padding-bottom: 8px;
      page-break-inside: avoid;
    }
    .faq-q {
      font-weight: 700;
      color: var(--primary);
      font-size: 10pt;
      display: flex;
      align-items: flex-start;
      gap: 6px;
    }
    .faq-a {
      font-size: 9pt;
      color: #374151;
      margin-top: 3px;
      margin-left: 20px;
      line-height: 1.4;
    }

    /* Recommendation Rules */
    .rule-card {
      background: #FFFDF9;
      border: 1px solid var(--border-soft);
      border-left: 4px solid var(--primary-light);
      border-radius: 8px;
      padding: 8px 12px;
      margin-bottom: 8px;
      font-size: 9pt;
      page-break-inside: avoid;
    }
    .rule-card .rule-title {
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 2px;
    }
  </style>
</head>
<body>

  <!-- ========================================================================= -->
  <!-- COVER PAGE -->
  <!-- ========================================================================= -->
  <div class="cover-container">
    <div class="cover-top-tag">
      🌿 LINE AI CHATBOT MASTER KNOWLEDGE BASE • ฉบับทางการ 2026
    </div>

    <div>
      <img src="${logoBase64}" alt="NIBBLY Logo" class="cover-logo" />
      <div class="cover-title">NIBBLY Healthy Treats</div>
      <div class="cover-subtitle">ฐานความรู้ระบบ AI แนะนำขนมสุขภาพสำหรับ LINE Official Account</div>
      <div class="cover-slogan">"Snack Happy, Live Healthy"</div>
      <p style="font-size: 10.5pt; color: #5D4037; max-width: 540px; margin: 0 auto;">
        Good ingredients. Great taste. Happy moments.<br>
        เอกสารอ้างอิงฐานข้อมูลองค์ความรู้ กฎการตัดสินใจ และแนวปฏิบัติของระบบปัญญาประดิษฐ์
      </p>
    </div>

    <div class="cover-visuals">
      <img src="${mascotBase64}" alt="NIBBLY Mascot" class="cover-circle-img" />
      <img src="${granolaBase64}" alt="Granola Bowl" class="cover-circle-img" />
      <img src="${couponBase64}" alt="Promo Coupon" class="cover-circle-img" />
    </div>

    <div class="cover-card-info">
      <table>
        <tr>
          <td class="label">ชื่อธุรกิจ:</td>
          <td>NIBBLY Healthy Treats (บริษัท นิบบลี่ เฮลท์ตี้ ทรีทส์ จำกัด)</td>
        </tr>
        <tr>
          <td class="label">ประเภทธุรกิจ:</td>
          <td>ร้านขนมเพื่อสุขภาพ และ E-Commerce อัจฉริยะ (Smart Snack Finder)</td>
        </tr>
        <tr>
          <td class="label">เว็บไซต์หลัก:</td>
          <td>https://k1ts4k0n.github.io/NIBBLY/</td>
        </tr>
        <tr>
          <td class="label">LINE OA:</td>
          <td>@682gfupf (AI Chatbot อัจฉริยะ 24 ชม.)</td>
        </tr>
        <tr>
          <td class="label">กลุ่มเป้าหมาย:</td>
          <td>นักเรียน นักศึกษา คนทำงานออฟฟิศ สายออกกำลังกาย และผู้รักสุขภาพ</td>
        </tr>
        <tr>
          <td class="label">การจัดทำเอกสาร:</td>
          <td>ฐานความรู้สำหรับนักศึกษาและพัฒนา LINE AI Chatbot (Version 1.0 Master)</td>
        </tr>
      </table>
    </div>

    <div class="cover-footer">
      © 2026 NIBBLY Healthy Treats. All Rights Reserved. • จัดทำโดย Senior AI Knowledge Engineer
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- TABLE OF CONTENTS -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">📖 สารบัญเอกสารฐานความรู้ (Table of Contents)</div>
    <div class="badge">NIBBLY KB-INDEX</div>
  </div>

  <p style="font-size: 9.5pt; color: #64748B;">
    เอกสารฉบับนี้รวบรวมข้อมูลองค์ความรู้ทั้งหมด 14 หัวข้อหลักตามเกณฑ์มาตรฐานวิชาการ และหัวข้อพิเศษสำหรับการกำกับพฤติกรรม AI เพื่อให้ระบบ LINE AI Chatbot สามารถดึงข้อมูลไปตอบคำถามลูกค้าได้อย่างถูกต้อง แม่นยำ และปลอดภัยสูงสุด 100%
  </p>

  <div class="toc-grid">
    <div class="toc-item">
      <span class="num">01</span>
      <span class="name">ข้อมูลทั่วไปของร้านและธุรกิจ (General Info)</span>
    </div>
    <div class="toc-item">
      <span class="num">02</span>
      <span class="name">ข้อมูลสินค้าเพื่อสุขภาพ 20 รายการ (Products)</span>
    </div>
    <div class="toc-item">
      <span class="num">03</span>
      <span class="name">หมวดหมู่สินค้าและบริการ (Categories)</span>
    </div>
    <div class="toc-item">
      <span class="num">04</span>
      <span class="name">ระบบเลือกสินค้าให้เหมาะกับลูกค้า (Targeting)</span>
    </div>
    <div class="toc-item">
      <span class="num">05</span>
      <span class="name">ข้อมูลเปรียบเทียบสินค้า (Product Comparison)</span>
    </div>
    <div class="toc-item">
      <span class="num">06</span>
      <span class="name">โปรโมชั่น คูปอง และสิทธิพิเศษ (Promotions)</span>
    </div>
    <div class="toc-item">
      <span class="num">07</span>
      <span class="name">ขั้นตอนการสั่งซื้อสินค้า (Ordering Steps)</span>
    </div>
    <div class="toc-item">
      <span class="num">08</span>
      <span class="name">การชำระเงินและช่องทางการเงิน (Payment)</span>
    </div>
    <div class="toc-item">
      <span class="num">09</span>
      <span class="name">การจัดส่งและติดตามพัสดุ (Shipping Policy)</span>
    </div>
    <div class="toc-item">
      <span class="num">10</span>
      <span class="name">การคืน เปลี่ยน และเคลมสินค้า (Claim & Return)</span>
    </div>
    <div class="toc-item">
      <span class="num">11</span>
      <span class="name">คำถามที่พบบ่อย 25 ข้อ (FAQ Standard 25)</span>
    </div>
    <div class="toc-item">
      <span class="num">12</span>
      <span class="name">คำถามระบบ Smart Snack Finder (Snack Quiz)</span>
    </div>
    <div class="toc-item">
      <span class="num">13</span>
      <span class="name">กฎการแนะนำสินค้า (Recommendation Rules)</span>
    </div>
    <div class="toc-item">
      <span class="num">14</span>
      <span class="name">ข้อมูลติดต่อและบริการหลังการขาย (Contact Care)</span>
    </div>
    <div class="toc-item" style="grid-column: span 2; background: #FFF4F7; border-color: var(--berry-pink);">
      <span class="num" style="background: var(--berry);">15</span>
      <span class="name" style="color: var(--berry);">บทพิเศษ: บุคลิกภาพแชทบอท & กฎความปลอดภัยป้องกัน AI Hallucination</span>
    </div>
  </div>

  <div class="info-box" style="margin-top: 20px;">
    <strong>🎯 ข้อกำหนดสำคัญในการนำฐานความรู้ไปประมวลผลด้วย AI (AI Operating Standard):</strong>
    <ul style="margin: 4px 0 0; padding-left: 18px; font-size: 8.5pt;">
      <li>ระบบ AI ต้องอ้างอิงเฉพาะข้อมูลที่ปรากฏในเอกสารฉบับนี้เท่านั้น (Grounding Truth)</li>
      <li>ห้าม AI คาดเดาหรือแต่งข้อมูลขึ้นเอง (Strictly Zero Hallucination)</li>
      <li>หากข้อมูลใดไม่มีในระบบ ให้ใช้ประโยคมาตรฐานปฏิเสธอย่างสุภาพพร้อมแนะนำช่องทางติดต่อเจ้าหน้าที่มนุษย์</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 1: GENERAL INFORMATION -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 1: ข้อมูลทั่วไปของร้านและธุรกิจ (General Information)</div>
    <div class="badge">CHAPTER 01</div>
  </div>

  <table class="data-table">
    <tr>
      <th style="width: 25%;">หัวข้อ</th>
      <th>รายละเอียดทางการ (Official Record)</th>
    </tr>
    <tr>
      <td><strong>ชื่อแบรนด์:</strong></td>
      <td><strong>NIBBLY</strong> (นิบบลี่)</td>
    </tr>
    <tr>
      <td><strong>ชื่อเต็มทางธุรกิจ:</strong></td>
      <td><strong>NIBBLY Healthy Treats</strong> (บริษัท นิบบลี่ เฮลท์ตี้ ทรีทส์ จำกัด)</td>
    </tr>
    <tr>
      <td><strong>สโลแกน (Slogan):</strong></td>
      <td>"Snack Happy, Live Healthy" (อร่อยกับของว่างอย่างมีความสุข สุขภาพดีทุกๆ วัน)</td>
    </tr>
    <tr>
      <td><strong>แนวคิดหลัก (Tagline):</strong></td>
      <td>"Good ingredients. Great taste. Happy moments."</td>
    </tr>
    <tr>
      <td><strong>ประเภทธุรกิจ:</strong></td>
      <td>ร้านจำหน่ายขนมเพื่อสุขภาพ และแพลตฟอร์ม E-Commerce อาหารสุขภาพอัจฉริยะ</td>
    </tr>
    <tr>
      <td><strong>คอนเซ็ปต์แบรนด์:</strong></td>
      <td>NIBBLY เชื่อว่า "ของว่างสุขภาพไม่จำเป็นต้องจืดชืด" เราจึงคัดสรรวัตถุดิบธรรมชาติคุณภาพพรีเมียม ปราศจากน้ำตาลทรายขาวขัดสี อบด้วยลมร้อนไม่ทอดน้ำมัน ผ่านการคิดค้นสูตรโดยนักโภชนาการ เพื่อตอบโจทย์ไลฟ์สไตล์คนรุ่นใหม่ ทั้งนักเรียน นักศึกษา วัยทำงาน และสายออกกำลังกาย</td>
    </tr>
    <tr>
      <td><strong>จุดเด่น 10 ประการ:</strong></td>
      <td>
        1. วัตถุดิบธรรมชาติ 100% คลีน ไร้น้ำตาลทรายขาว<br>
        2. อบด้วยลมร้อน ไม่ใช้น้ำมันทอด (Baked, Not Fried)<br>
        3. ข้อมูลโภชนาการและสารก่อภูมิแพ้โปร่งใสทุกรายการ<br>
        4. แบรนด์คาแรคเตอร์น่ารัก เป็นมิตร อบอุ่น เข้าถึงง่าย<br>
        5. ระบบ Smart Snack Finder แนะนำขนมตรงใจเฉพาะบุคคล<br>
        6. สั่งซื้อสะดวกรวดเร็วผ่าน Website และ LINE OA<br>
        7. โปรโมชั่นโค้ดส่วนลดและระบบสมาชิก NIBBLY Club<br>
        8. สะสมแต้ม Berry Points แลกของรางวัลสุดคุ้ม<br>
        9. จัดส่งรวดเร็วทั่วไทย พร้อมประกัน Happy Guarantee<br>
        10. มีบริการแอดมินและ AI Assistant ให้คำปรึกษาตลอด 24 ชม.
      </td>
    </tr>
    <tr>
      <td><strong>เวลาเปิด-ปิด:</strong></td>
      <td>
        • <strong>หน้าร้าน Flagship Store:</strong> เปิดให้บริการทุกวัน 08:30 – 18:00 น.<br>
        • <strong>ระบบสั่งซื้อออนไลน์ (Web & LINE):</strong> เปิดรับออเดอร์ตลอด 24 ชั่วโมง<br>
        • <strong>ฝ่ายบริการลูกค้า (Customer Service):</strong> ทุกวัน 08:00 – 21:00 น.
      </td>
    </tr>
    <tr>
      <td><strong>ที่อยู่หน้าร้านจริง:</strong></td>
      <td>เลขที่ 128/9 ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110 (ใกล้ BTS อโศก / MRT สุขุมวิท)</td>
    </tr>
    <tr>
      <td><strong>ช่องทางติดต่อ:</strong></td>
      <td>
        • <strong>LINE Official Account:</strong> @682gfupf (แชทบอทอัจฉริยะ & ติดต่อแอดมิน)<br>
        • <strong>Facebook Page:</strong> NIBBLY Healthy Treats (facebook.com/nibblyhealthytreats)<br>
        • <strong>Instagram / TikTok:</strong> @682gfupf<br>
        • <strong>โทรศัพท์:</strong> 02-123-4567, 089-987-6543<br>
        • <strong>อีเมล:</strong> hello.nibbly@gmail.com, support@nibblytreats.com<br>
        • <strong>เว็บไซต์หลัก:</strong> https://k1ts4k0n.github.io/NIBBLY/
      </td>
    </tr>
    <tr>
      <td><strong>ช่องทางสั่งซื้อ:</strong></td>
      <td>
        1. เว็บไซต์ร้านค้า: https://k1ts4k0n.github.io/NIBBLY/shop<br>
        2. แชทสั่งซื้อทาง LINE OA: @682gfupf<br>
        3. หน้าร้าน NIBBLY Flagship Store สุขุมวิท 23
      </td>
    </tr>
  </table>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 2: PRODUCT CATALOG (20 PRODUCTS) -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 2: ข้อมูลสินค้าเพื่อสุขภาพ 20 รายการ (Products 1-10)</div>
    <div class="badge">CHAPTER 02 (PART 1)</div>
  </div>

  <p style="font-size: 9pt; color: #64748B;">
    คลังข้อมูลสินค้าเพื่อสุขภาพของ NIBBLY ทั้งหมด 20 รายการ พร้อมคุณค่าทางโภชนาการ สารก่อภูมิแพ้ และส่วนผสมจริง
  </p>

  <div class="product-grid">
    ${productsData.slice(0, 10).map(p => `
      <div class="product-card">
        <div>
          <div class="product-card-header">
            <img src="${productImages[p.art] || ''}" alt="${p.nameEn}" class="product-thumb" />
            <div class="product-meta">
              <span class="product-badge badge-${p.badge.toLowerCase().replace(/\s+/g, '')}">${p.badge}</span>
              <div class="product-name-th">${p.id}. ${p.nameTh}</div>
              <div class="product-name-en">${p.nameEn}</div>
              <div class="product-price">฿${p.price} <span style="font-size:7.5pt; color:#718096; font-weight:normal;">/ ซอง (★ ${p.rating} จาก ${p.reviews} รีวิว)</span></div>
            </div>
          </div>
          <div class="product-desc">${p.description}</div>
          <div class="product-nutrition-pills">
            <div class="nut-item"><strong>${p.nutrition.cal}</strong>พลังงาน</div>
            <div class="nut-item"><strong>${p.nutrition.protein}</strong>โปรตีน</div>
            <div class="nut-item"><strong>${p.nutrition.fibre}</strong>ไฟเบอร์</div>
            <div class="nut-item"><strong>${p.nutrition.sugar}</strong>น้ำตาล</div>
          </div>
          <div class="product-details-list">
            <div><strong>หมวดหมู่:</strong> ${p.category}</div>
            <div><strong>ส่วนผสมหลัก:</strong> ${p.ingredients.join(', ')}</div>
            <div><strong>สารก่อภูมิแพ้:</strong> <span style="color:${p.allergens.includes('Gluten') || p.allergens.includes('Almond') ? '#C53030' : '#4A5568'};">${p.allergens.join(', ')}</span></div>
            <div><strong>เหมาะสำหรับ:</strong> ${p.perfectFor.join(', ')}</div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="page-break"></div>

  <!-- PRODUCTS PART 2 (11-20) -->
  <div class="section-header-banner">
    <div class="title">บทที่ 2: ข้อมูลสินค้าเพื่อสุขภาพ 20 รายการ (Products 11-20)</div>
    <div class="badge">CHAPTER 02 (PART 2)</div>
  </div>

  <div class="product-grid">
    ${productsData.slice(10, 20).map(p => `
      <div class="product-card">
        <div>
          <div class="product-card-header">
            <img src="${productImages[p.art] || ''}" alt="${p.nameEn}" class="product-thumb" />
            <div class="product-meta">
              <span class="product-badge badge-${p.badge.toLowerCase().replace(/\s+/g, '')}">${p.badge}</span>
              <div class="product-name-th">${p.id}. ${p.nameTh}</div>
              <div class="product-name-en">${p.nameEn}</div>
              <div class="product-price">฿${p.price} <span style="font-size:7.5pt; color:#718096; font-weight:normal;">/ ซอง (★ ${p.rating} จาก ${p.reviews} รีวิว)</span></div>
            </div>
          </div>
          <div class="product-desc">${p.description}</div>
          <div class="product-nutrition-pills">
            <div class="nut-item"><strong>${p.nutrition.cal}</strong>พลังงาน</div>
            <div class="nut-item"><strong>${p.nutrition.protein}</strong>โปรตีน</div>
            <div class="nut-item"><strong>${p.nutrition.fibre}</strong>ไฟเบอร์</div>
            <div class="nut-item"><strong>${p.nutrition.sugar}</strong>น้ำตาล</div>
          </div>
          <div class="product-details-list">
            <div><strong>หมวดหมู่:</strong> ${p.category}</div>
            <div><strong>ส่วนผสมหลัก:</strong> ${p.ingredients.join(', ')}</div>
            <div><strong>สารก่อภูมิแพ้:</strong> <span style="color:${p.allergens.includes('Gluten') || p.allergens.includes('Almond') ? '#C53030' : '#4A5568'};">${p.allergens.join(', ')}</span></div>
            <div><strong>เหมาะสำหรับ:</strong> ${p.perfectFor.join(', ')}</div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 3: CATEGORIES -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 3: หมวดหมู่สินค้าและบริการ (Product Categories)</div>
    <div class="badge">CHAPTER 03</div>
  </div>

  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 18%;">หมวดหมู่</th>
        <th style="width: 32%;">คำอธิบายและแนวคิด</th>
        <th style="width: 25%;">เหมาะกับใคร</th>
        <th style="width: 25%;">ตัวอย่างสินค้า & จุดเด่น</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Granola (กราโนล่า)</strong></td>
        <td>ข้าวโอ๊ตคลัสเตอร์อบกรอบไฟอ่อน ผสมถั่วและผลไม้แท้ ไร้น้ำตาลทรายขาว</td>
        <td>มื้อเช้าเร่งรีบ, สายสุขภาพทานคู่นมหรือโยเกิร์ต</td>
        <td>NIBBLY Berry Granola (149.-)<br>จุดเด่น: ไฟเบอร์สูง 5g กรอบนาน</td>
      </tr>
      <tr>
        <td><strong>2. Energy Bites (เอเนอร์จี้ไบต์)</strong></td>
        <td>ก้อนพลังงานพอดีคำ เนื้อสัมผัสหนึบหนับ หวานธรรมชาติจากอินทผาลัม</td>
        <td>นักเรียน, คนทำงาน, นักกีฬาก่อนเข้ายิม</td>
        <td>Banana Oat Bites (119.-)<br>จุดเด่น: พกพาง่าย อิ่มเร็ว อยู่ท้อง</td>
      </tr>
      <tr>
        <td><strong>3. Nut Mix (ถั่วรวมพรีเมียม)</strong></td>
        <td>ถั่วเปลือกแข็งเกรดคัดพิเศษ อบกรอบไร้น้ำมัน ผสานผลไม้แห้งและโกโก้</td>
        <td>วัยทำงานหน้าคอม, ผู้ต้องการไขมันดีบำรุงสมอง</td>
        <td>Blueberry Nut Mix (145.-)<br>จุดเด่น: ไขมันดี HDL สูง โอเมก้า 3</td>
      </tr>
      <tr>
        <td><strong>4. Dried Fruits (ผลไม้อบแห้ง)</strong></td>
        <td>ผลไม้แท้ 100% สกัดความชื้น ไม่ใส่น้ำเชื่อมหรือน้ำตาลเพิ่ม</td>
        <td>สายหวานธรรมชาติ, ทานแก้ง่วงยามบ่าย</td>
        <td>Tropical Fruit Mix (135.-)<br>จุดเด่น: วิตามินซีสูง ใยอาหารแท้</td>
      </tr>
      <tr>
        <td><strong>5. Healthy Cookies (คุกกี้สุขภาพ)</strong></td>
        <td>คุกกี้ข้าวโอ๊ตอบนุ่ม Soft-Baked ใช้ความหวานจากน้ำตาลมะพร้าว</td>
        <td>ทานคู่กาแฟยามบ่าย, ของว่างคลายเครียด</td>
        <td>Berry Oat Cookies (125.-)<br>จุดเด่น: ไม่ใช้แป้งฟอกขาว แคลอรี่ต่ำ</td>
      </tr>
      <tr>
        <td><strong>6. Protein Snacks (สแน็กโปรตีนสูง)</strong></td>
        <td>สูตรเสริมโปรตีนสกัดจากพืช (Pea Protein) และเนยถั่วแท้</td>
        <td>คนเล่นเวท, ออกกำลังกาย, คุมสัดส่วน</td>
        <td>Peanut Butter Bites (159.-)<br>จุดเด่น: โปรตีนสูงถึง 8g ต่อซอง</td>
      </tr>
      <tr>
        <td><strong>7. Healthy Snacks (เมล็ดพืชซูเปอร์ฟู้ดส์)</strong></td>
        <td>เมล็ดฟักทอง ทานตะวัน และแฟลกซ์ อบไฟอ่อน รสชาติเค็มมันกลมกล่อม</td>
        <td>เคี้ยวเพลินแก้ง่วง, เสริมแร่ธาตุสังกะสี</td>
        <td>Pumpkin Seed Crunch (135.-)<br>จุดเด่น: ซูเปอร์ซีดส์ ธาตุเหล็กสูง</td>
      </tr>
      <tr>
        <td><strong>8. Trail Mix (เทรลมิกซ์รวมดาว)</strong></td>
        <td>การรวมมิตร 7 ซูเปอร์ฟู้ดส์ระดับพรีเมียม ถั่ว ผลไม้ เมล็ดพืช และโอ๊ต</td>
        <td>นักเดินทาง, สายแคมป์ปิ้ง, ทำงานมาราธอน</td>
        <td>Super Snack Mix (169.-)<br>จุดเด่น: คุณค่าอาหารครบจบในซองเดียว</td>
      </tr>
      <tr>
        <td><strong>9. Snack Box & Gift Sets</strong></td>
        <td>กล่องของขวัญจัดเซ็ตรวมขนมสุขภาพยอดนิยม พร้อมการ์ดอวยพร</td>
        <td>ซื้อเป็นของขวัญวันเกิด, เยี่ยมไข้, ของฝากปีใหม่</td>
        <td>NIBBLY Happiness Box (399-599.-)<br>จุดเด่น: แพ็กเกจน่ารัก พรีเมียม</td>
      </tr>
      <tr>
        <td><strong>10. Vegan Clean</strong></td>
        <td>กลุ่มสินค้าพืช 100% ไร้นม เนย ไข่ และน้ำผึ้ง ปลอดภัยจากแลคโตส</td>
        <td>ชาวมังสวิรัติ, วีแกน, ผู้แพ้นมวัว</td>
        <td>Green Matcha Bites (139.-)<br>จุดเด่น: ปลอดภัย ย่อยง่าย สบายท้อง</td>
      </tr>
    </tbody>
  </table>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 4: TARGETING CUSTOMER PROFILES -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 4: การเลือกสินค้าให้เหมาะกับลูกค้า (Customer Targeting)</div>
    <div class="badge">CHAPTER 04</div>
  </div>

  <p style="font-size: 9.5pt;">
    ระบบวิเคราะห์ความต้องการของลูกค้าแบ่งออกเป็น 4 มิติหลัก เพื่อให้ LINE AI Chatbot สามารถจับคู่ขนมได้อย่างแม่นยำ:
  </p>

  <h3>A. จำแนกตามงบประมาณ (Budget Matching)</h3>
  <table class="data-table">
    <tr>
      <th style="width: 25%;">ช่วงงบประมาณ</th>
      <th style="width: 40%;">สินค้าแนะนำ</th>
      <th>คำแนะนำสำหรับ AI</th>
    </tr>
    <tr>
      <td><strong>ต่ำกว่า 120 บาท</strong></td>
      <td>Banana Cinnamon Chips (109.-), Banana Oat Bites (119.-)</td>
      <td>แนะนำสินค้าราคาย่อมเยา ชูความคุ้มค่าและทานง่าย</td>
    </tr>
    <tr>
      <td><strong>120 – 140 บาท</strong></td>
      <td>Berry Oat Cookies (125.-), Choco Oat Crunch (139.-), Green Matcha Bites (139.-), Honey Almond (139.-)</td>
      <td>เป็นช่วงราคายอดนิยม แนะนำตามรสชาติที่ลูกค้าชอบ</td>
    </tr>
    <tr>
      <td><strong>140 – 170 บาท</strong></td>
      <td>Berry Granola (149.-), Protein Bites (159.-), Super Snack Mix (169.-)</td>
      <td>กลุ่มสินค้า Best Seller คุณภาพอัดแน่น โปรตีนและสารอาหารสูง</td>
    </tr>
    <tr>
      <td><strong>300 – 500+ บาท</strong></td>
      <td>เซ็ตจับคู่ 3-4 ซอง หรือ Snack Box Gift Set</td>
      <td>ชวนสั่งให้ครบ 500 บาท เพื่อรับสิทธิ์ "จัดส่งฟรีทั่วไทย"</td>
    </tr>
  </table>

  <h3>B. จำแนกตามเป้าหมายและไลฟ์สไตล์ (Goal & Lifestyle)</h3>
  <table class="data-table">
    <tr>
      <th style="width: 28%;">เป้าหมาย / ไลฟ์สไตล์</th>
      <th style="width: 35%;">สินค้าตรงโจทย์</th>
      <th>เหตุผลทางโภชนาการ</th>
    </tr>
    <tr>
      <td><strong>คุมน้ำหนัก & นับแคลอรี (Diet)</strong></td>
      <td>Banana Chips, Strawberry Yogurt Bites, Pumpkin Crunch</td>
      <td>แคลอรีต่ำ &lt;165 kcal, ไฟเบอร์สูง ทำให้อิ่มนาน ไม่โหยน้ำตาล</td>
    </tr>
    <tr>
      <td><strong>ออกกำลังกาย & ฟิตเนส (Fitness)</strong></td>
      <td>Peanut Butter Protein Bites, Cashew Honey Bites</td>
      <td>โปรตีนสูง 8g ช่วยซ่อมแซมกล้ามเนื้อ และคาร์บเชิงซ้อนเติมพลัง</td>
    </tr>
    <tr>
      <td><strong>อ่านหนังสือ / เตรียมสอบ (Student)</strong></td>
      <td>Choco Oat Crunch, Green Matcha Bites, Banana Oat Bites</td>
      <td>ฟลาโวนอยด์จากโกโก้ และแอล-ธีอะนีนจากมัทฉะ ช่วยสมาธิและโฟกัส</td>
    </tr>
    <tr>
      <td><strong>วัยทำงานออฟฟิศ (Office Life)</strong></td>
      <td>Dark Cocoa Nut Mix, Blueberry Nut Mix, Honey Almond</td>
      <td>เคี้ยวเพลินแก้ง่วงยามบ่าย บำรุงสายตาจากจอคอมพิวเตอร์</td>
    </tr>
    <tr>
      <td><strong>ขับถ่ายยาก ท้องผูก (Gut Health)</strong></td>
      <td>NIBBLY Berry Granola, Apple Cinnamon Granola</td>
      <td>ไฟเบอร์สูง 5g พร้อมเบต้ากลูแคนจากข้าวโอ๊ตปรับสมดุลลำไส้</td>
    </tr>
    <tr>
      <td><strong>ของขวัญ / ของฝาก (Gifting)</strong></td>
      <td>Snack Box Set, NIBBLY Super Snack Mix</td>
      <td>แพ็กเกจจิ้งน่ารักพรีเมียม สื่อถึงความห่วงใยสุขภาพของผู้รับ</td>
    </tr>
  </table>

  <h3>C. จำแนกตามข้อจำกัดด้านสุขภาพและสารก่อภูมิแพ้ (Allergens & Dietary Constraints)</h3>
  <div class="alert-box">
    <strong>⚠️ กฎเหล็กด้านสารก่อภูมิแพ้ (Allergen Safety Guardrails):</strong>
    <ul style="margin: 4px 0 0; padding-left: 18px; font-size: 8.5pt;">
      <li><strong>แพ้นมวัว (Lactose Intolerance):</strong> แนะนำสินค้ากลุ่ม <em>VEGAN</em> เช่น Tropical Fruit Mix, Coconut Almond Granola, Banana Chips, Green Matcha Bites (ห้ามแนะนำ Strawberry Yogurt Bites เด็ดขาด)</li>
      <li><strong>แพ้ถั่ว (Nut Allergy):</strong> ห้ามแนะนำ Nut Mix ทุกชนิด ให้แนะนำผลไม้อบแห้งหรือเมล็ดพืช Pumpkin Seed Crunch แทน</li>
      <li><strong>แพ้กลูเตน (Gluten Allergy / Celiac):</strong> แนะนำ Tropical Fruit Mix และ Banana Cinnamon Chips (สินค้าข้าวโอ๊ตส่วนใหญ่มีกลูเตน)</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 5: PRODUCT COMPARISON -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 5: ข้อมูลเปรียบเทียบสินค้า (Product Comparison)</div>
    <div class="badge">CHAPTER 05</div>
  </div>

  <p style="font-size: 9.5pt;">
    แนวทางการเปรียบเทียบสินค้า 2-3 รายการสำหรับ AI โดยเน้นการวิเคราะห์จุดเด่นที่แตกต่างเพื่อช่วยลูกค้าตัดสินใจอย่างเป็นกลาง:
  </p>

  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 20%;">เกณฑ์เปรียบเทียบ</th>
        <th style="width: 40%;">สินค้า A: NIBBLY Berry Granola (149.-)</th>
        <th style="width: 40%;">สินค้า B: Choco Oat Crunch (139.-)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>รสสัมผัสและกลิ่น</strong></td>
        <td>เปรี้ยวอมหวาน สดชื่นจากสตรอว์เบอร์รีและบลูเบอร์รีแท้</td>
        <td>เข้มข้น หวานละมุน ขมปลายลิ้นจากดาร์กโกโก้แท้</td>
      </tr>
      <tr>
        <td><strong>โภชนาการหลัก</strong></td>
        <td>175 kcal | โปรตีน 5g | ไฟเบอร์ 5g | น้ำตาล 7g</td>
        <td>172 kcal | โปรตีน 4g | ไฟเบอร์ 4g | น้ำตาล 6g</td>
      </tr>
      <tr>
        <td><strong>จุดเด่นเฉพาะ</strong></td>
        <td>ไฟเบอร์สูงมาก ช่วยระบบขับถ่ายและผิวพรรณสดใส</td>
        <td>ฟลาโวนอยด์บำรุงสมอง คลายความเครียด แก้อยากของหวาน</td>
      </tr>
      <tr>
        <td><strong>เหมาะที่สุดสำหรับ</strong></td>
        <td>ทานเป็นอาหารเช้าคู่กับนมหรือโยเกิร์ต</td>
        <td>ทานยามบ่ายแก้ง่วง หรืออ่านหนังสือสอบดึกๆ</td>
      </tr>
      <tr style="background: #FFFDF0;">
        <td><strong>สรุปคำแนะนำของ AI</strong></td>
        <td colspan="2">
          "ถ้าคุณลูกค้าเน้นความสดชื่นและอยากได้ไฟเบอร์ช่วยระบบขับถ่าย แนะนำ <strong>NIBBLY Berry Granola</strong> ครับ 🍓<br>
          แต่ถ้าชอบรสชาติช็อกโกแลตเข้มข้น อยากได้ขนมช่วยคลายเครียดระหว่างทำงาน แนะนำ <strong>Choco Oat Crunch</strong> ตอบโจทย์กว่าครับ 🍫"
        </td>
      </tr>
    </tbody>
  </table>

  <table class="data-table" style="margin-top: 14px;">
    <thead>
      <tr>
        <th style="width: 20%;">เกณฑ์เปรียบเทียบ</th>
        <th style="width: 40%;">สินค้า A: Banana Oat Bites (119.-)</th>
        <th style="width: 40%;">สินค้า B: Peanut Butter Protein Bites (159.-)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>รสสัมผัสและกลิ่น</strong></td>
        <td>เนื้อสัมผัสนุ่มหนึบ หอมกล้วยหอมธรรมชาติและโอ๊ต</td>
        <td>เข้มข้น หอมมันเนยถั่วลิสงแท้ เนื้อแน่นเคี้ยวเพลิน</td>
      </tr>
      <tr>
        <td><strong>โภชนาการหลัก</strong></td>
        <td>160 kcal | โปรตีน 3g | ไฟเบอร์ 4g | น้ำตาล 6g</td>
        <td>190 kcal | โปรตีน 8g | ไฟเบอร์ 4g | น้ำตาล 5g</td>
      </tr>
      <tr>
        <td><strong>จุดเด่นเฉพาะ</strong></td>
        <td>แคลอรีเบา ย่อยง่าย สบายท้อง ราคาย่อมเยา</td>
        <td>โปรตีนสูงถึง 8g ต่อซอง อิ่มนาน ท้องไม่ร้องจุกจิก</td>
      </tr>
      <tr>
        <td><strong>เหมาะที่สุดสำหรับ</strong></td>
        <td>ทานเล่นระหว่างเรียน หรือของว่างเบาๆ ยามบ่าย</td>
        <td>ทานเสริมพลังก่อน/หลังเข้ายิม หรือสายฟิตเนส</td>
      </tr>
      <tr style="background: #FFFDF0;">
        <td><strong>สรุปคำแนะนำของ AI</strong></td>
        <td colspan="2">
          "ถ้าเน้นของว่างทานง่าย แคลเบาสบายกระเป๋า แนะนำ <strong>Banana Oat Bites</strong> ครับ 🍌<br>
          แต่ถ้าเน้นโปรตีนสร้างกล้ามเนื้อ และอยากได้ขนมที่อิ่มท้องยาวนาน แนะนำ <strong>Peanut Butter Protein Bites</strong> เหมาะกว่าแน่นอนครับ 💪"
        </td>
      </tr>
    </tbody>
  </table>

  <div class="info-box">
    <strong>📌 ข้อห้ามสำคัญสำหรับ AI ในการเปรียบเทียบ:</strong>
    ห้ามสรุปว่าสินค้าชิ้นใด "ดีที่สุดในโลก" แบบไม่มีเงื่อนไข ให้ใช้คำว่า <em>"เหมาะสมกว่าในด้าน..."</em>, <em>"ตอบโจทย์กว่าสำหรับผู้ที่เน้น..."</em> หรือ <em>"เป็นทางเลือกที่คุ้มค่ากว่าสำหรับ..."</em>
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 6: PROMOTIONS & PRIVILEGES -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 6: โปรโมชั่นและสิทธิพิเศษ (Promotions & Coupons)</div>
    <div class="badge">CHAPTER 06</div>
  </div>

  <p style="font-size: 9.5pt;">
    ข้อมูลโปรโมชั่น โค้ดส่วนลด และระบบสมาชิก NIBBLY Club ที่ใช้งานได้จริงในระบบ (ห้าม AI แต่งโค้ดใหม่ขึ้นเองโดยเด็ดขาด):
  </p>

  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 22%;">ชื่อโปรโมชั่น / โค้ด</th>
        <th style="width: 15%;">สิทธิประโยชน์</th>
        <th style="width: 38%;">เงื่อนไขการใช้งาน</th>
        <th style="width: 25%;">วันหมดอายุ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong style="color:var(--berry);">WELCOMENIBBLY</strong></td>
        <td>ส่วนลด 10%</td>
        <td>สำหรับลูกค้าใหม่ สั่งซื้อครั้งแรก ไม่มีขั้นต่ำ ใช้ได้กับขนมทุกหมวด</td>
        <td>31 ธันวาคม 2026</td>
      </tr>
      <tr>
        <td><strong style="color:var(--berry);">NIBBLYWELCOME15</strong></td>
        <td>ส่วนลด 15%</td>
        <td>สิทธิพิเศษเมื่อสมัครสมาชิก NIBBLY Club บนหน้าเว็บ ใช้ได้ในบิลแรก</td>
        <td>31 ธันวาคม 2026</td>
      </tr>
      <tr>
        <td><strong style="color:var(--berry);">NIBBLY50</strong></td>
        <td>ลดทันที 50 บาท</td>
        <td>เมื่อมียอดสั่งซื้อขนมรวมตั้งแต่ 350 บาทขึ้นไป (1 สิทธิ์/ท่าน)</td>
        <td>31 ธันวาคม 2026</td>
      </tr>
      <tr>
        <td><strong style="color:var(--berry);">FREESHIP</strong></td>
        <td>จัดส่งฟรี (ลด 40.-)</td>
        <td>คูปองส่งฟรีมาตรฐาน ไม่มีกำหนดยอดซื้อขั้นต่ำ</td>
        <td>31 ธันวาคม 2026</td>
      </tr>
      <tr>
        <td><strong style="color:var(--berry);">HEALTHY20</strong></td>
        <td>ส่วนลด 20%</td>
        <td>เมื่อสั่งซื้อขนมในหมวด Granola หรือ Nut Mix ครบ 3 ซองขึ้นไป</td>
        <td>31 ธันวาคม 2026</td>
      </tr>
    </tbody>
  </table>

  <h3>ระบบสมาชิก NIBBLY Club & แต้ม Berry Points</h3>
  <div class="highlight-box">
    <strong>👑 สิทธิประโยชน์สำหรับสมาชิก NIBBLY Club (สมัครฟรี 100%):</strong>
    <ul style="margin: 4px 0 0; padding-left: 18px; font-size: 8.5pt;">
      <li><strong>Welcome Bonus:</strong> รับโค้ดลด 15% (<code>NIBBLYWELCOME15</code>) ทันทีหลังลงทะเบียน</li>
      <li><strong>Welcome Points:</strong> รับฟรีทันที 100 Berry Points เข้ากระเป๋าสมาชิก</li>
      <li><strong>ทุกการสั่งซื้อ:</strong> ทุกยอดซื้อ 20 บาท = รับ 1 Berry Point</li>
      <li><strong>การแลกแต้ม:</strong>
        <br>• 100 Berry Points = แลกรับส่วนลด 50 บาท
        <br>• 200 Berry Points = แลกรับ Energy Bites หรือ Granola ขนาดทดลองฟรี 1 ซอง
      </li>
      <li><strong>Birthday Gift:</strong> รับขนมเพื่อสุขภาพฟรี 1 กล่องในเดือนเกิดของสมาชิก</li>
    </ul>
  </div>

  <div class="alert-box">
    <strong>⚠️ ข้อควรระวังสำหรับ AI (Promo Safety Rules):</strong>
    หากลูกค้าขอลดราคาเพิ่ม หรือถามหาโค้ดส่วนลดอื่นที่ไม่อยู่ในตารางด้านบน AI ต้องตอบว่า <em>"ขณะนี้ร้านมีโค้ดส่วนลดตามรายการข้างต้นครับ สามารถใช้โค้ด WELCOMENIBBLY (ลด 10%) หรือสมัครสมาชิกเพื่อรับ NIBBLYWELCOME15 (ลด 15%) ได้ทันทีครับ"</em> ห้ามประดิษฐ์โค้ดใหม่โดยเด็ดขาด!
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 7: ORDERING PROCESS -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 7: ขั้นตอนการสั่งซื้อสินค้า (Ordering Process)</div>
    <div class="badge">CHAPTER 07</div>
  </div>

  <p style="font-size: 9.5pt;">
    ลำดับขั้นตอนการสั่งซื้อสินค้าผ่านระบบออนไลน์ของ NIBBLY ทั้งหมด 11 ขั้นตอนมาตรฐาน:
  </p>

  <table class="data-table">
    <tr>
      <th style="width: 15%;">ขั้นตอน</th>
      <th style="width: 35%;">การดำเนินการของลูกค้า</th>
      <th>การสนับสนุนของระบบ / AI</th>
    </tr>
    <tr>
      <td><strong>ขั้นที่ 1</strong></td>
      <td>เลือกดูสินค้าที่สนใจ</td>
      <td>เข้าสู่หน้า Shop หรือทำแบบทดสอบ Smart Snack Finder บน LINE</td>
    </tr>
    <tr>
      <td><strong>ขั้นที่ 2</strong></td>
      <td>ดูรายละเอียดสินค้า</td>
      <td>ตรวจสอบโภชนาการ ส่วนผสม สารก่อภูมิแพ้ และรีวิวจากลูกค้า</td>
    </tr>
    <tr>
      <td><strong>ขั้นที่ 3</strong></td>
      <td>เลือกจำนวนสินค้า</td>
      <td>ระบุจำนวนซองที่ต้องการสั่งซื้อ</td>
    </tr>
    <tr>
      <td><strong>ขั้นที่ 4</strong></td>
      <td>เพิ่มลงในตะกร้า (Add to Bag)</td>
      <td>ระบบบันทึกสินค้าลงตะกร้าพร้อมคำนวณยอดเงินรวม</td>
    </tr>
    <tr>
      <td><strong>ขั้นที่ 5</strong></td>
      <td>ตรวจสอบรายการและกรอกโค้ด</td>
      <td>กรอกโค้ดส่วนลด เช่น <code>WELCOMENIBBLY</code> หรือ <code>NIBBLYWELCOME15</code></td>
    </tr>
    <tr>
      <td><strong>ขั้นที่ 6</strong></td>
      <td>กรอกข้อมูลการจัดส่ง</td>
      <td>ระบุชื่อ-นามสกุล เบอร์โทรศัพท์ ที่อยู่จัดส่ง และรหัสไปรษณีย์</td>
    </tr>
    <tr>
      <td><strong>ขั้นที่ 7</strong></td>
      <td>เลือกช่องทางชำระเงิน</td>
      <td>เลือก PromptPay QR, โอนเงินธนาคาร, บัตรเครดิต, หรือ COD</td>
    </tr>
    <tr>
      <td><strong>ขั้นที่ 8</strong></td>
      <td>ตรวจสอบความถูกต้องคำสั่งซื้อ</td>
      <td>ตรวจสอบสรุปยอดเงินสุทธิ ส่วนลด และค่าจัดส่ง</td>
    </tr>
    <tr>
      <td><strong>ขั้นที่ 9</strong></td>
      <td>ยืนยันการสั่งซื้อและชำระเงิน</td>
      <td>แนบสลิปโอนเงิน หรือชำระผ่านระบบบัตรเครดิต</td>
    </tr>
    <tr>
      <td><strong>ขั้นที่ 10</strong></td>
      <td>ระบบยืนยันคำสั่งซื้อ</td>
      <td>รับหมายเลขคำสั่งซื้อ (Order ID) และใบเสร็จทาง LINE / Email</td>
    </tr>
    <tr>
      <td><strong>ขั้นที่ 11</strong></td>
      <td>รอรับพัสดุและติดตามสถานะ</td>
      <td>ระบบส่งเลขพัสดุ Tracking Link ตรวจสอบสถานะการจัดส่งได้ 24 ชม.</td>
    </tr>
  </table>

  <h3>คำตอบมาตรฐานของ AI เมื่อลูกค้าถาม "สั่งซื้ออย่างไร" (Quick Answer)</h3>
  <div class="info-box">
    "สั่งซื้อง่ายๆ เพียง 4 สเต็ปนี้ได้เลยครับ 🛒🌿<br>
    1. <strong>เลือกขนม:</strong> เลือกรสชาติที่ชอบผ่านเว็บไซต์ หรือให้ผมช่วยเลือกผ่าน Smart Snack Finder<br>
    2. <strong>ใส่ตะกร้า & กรอกโค้ด:</strong> กดเพิ่มลงตะกร้าแล้วใส่โค้ด <code>WELCOMENIBBLY</code> ลด 10%<br>
    3. <strong>กรอกที่อยู่ & ชำระเงิน:</strong> เลือกจ่ายผ่าน QR PromptPay, โอนเงิน หรือบัตรเครดิต<br>
    4. <strong>รอรับขนม:</strong> จัดส่งด่วนถึงหน้าบ้านภายใน 1-2 วันทำการครับ 🚚✨"
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 8: PAYMENT METHODS -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 8: ช่องทางการชำระเงิน (Payment Methods)</div>
    <div class="badge">CHAPTER 08</div>
  </div>

  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 25%;">ช่องทางชำระเงิน</th>
        <th style="width: 40%;">ข้อมูลทางการ (Official Financial Records)</th>
        <th>เงื่อนไขและค่าธรรมเนียม</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. QR PromptPay (พร้อมเพย์)</strong></td>
        <td>
          • บัญชีพร้อมเพย์นิติบุคคล: <strong>0105567890123</strong><br>
          • เบอร์โทรศัพท์พร้อมเพย์: <strong>089-987-6543</strong><br>
          • ชื่อบัญชี: <strong>บจก. นิบบลี่ เฮลท์ตี้ ทรีทส์</strong>
        </td>
        <td>ฟรีค่าธรรมเนียม สแกนจ่ายได้ทุกแอปพลิเคชันธนาคาร อนุมัติยอดรวดเร็ว</td>
      </tr>
      <tr>
        <td><strong>2. โอนผ่านบัญชีธนาคาร (Bank Transfer)</strong></td>
        <td>
          • ธนาคาร: <strong>กสิกรไทย (KBANK)</strong><br>
          • เลขที่บัญชี: <strong>123-4-56789-0</strong><br>
          • ชื่อบัญชี: <strong>บจก. นิบบลี่ เฮลท์ตี้ ทรีทส์</strong><br>
          • สาขา: <strong>อโศก (สุขุมวิท 21)</strong>
        </td>
        <td>เมื่อโอนแล้ว รบกวนส่งหลักฐานสลิปโอนเงินทาง LINE OA เพื่อยืนยันออเดอร์</td>
      </tr>
      <tr>
        <td><strong>3. บัตรเครดิต / เดบิต (Credit/Debit Card)</strong></td>
        <td>
          • รองรับ: <strong>Visa, Mastercard, JCB, UnionPay</strong><br>
          • ผ่านระบบเกตเวย์ความปลอดภัยมาตรฐานระดับสากล 3D-Secure
        </td>
        <td>ไม่มีชาร์จธรรมเนียมบัตรเครดิต (0% Surcharge) ตัดบัตรเรียบร้อยทันที</td>
      </tr>
      <tr>
        <td><strong>4. TrueMoney Wallet</strong></td>
        <td>
          • เบอร์วอลเล็ท: <strong>089-987-6543</strong><br>
          • ชื่อบัญชี: NIBBLY Official Store
        </td>
        <td>สะดวกสำหรับผู้ใช้งาน E-Wallet ไม่เสียค่าธรรมเนียมเพิ่มเติม</td>
      </tr>
      <tr>
        <td><strong>5. เก็บเงินปลายทาง (Cash on Delivery: COD)</strong></td>
        <td>
          • ชำระเงินสดกับพนักงานขนส่งเมื่อพัสดุจัดส่งถึงปลายทาง
        </td>
        <td>มีค่าบริการบริหารจัดการพัสดุปลายทาง 20 บาท ตรวจสอบชื่อที่อยู่ก่อนจัดส่ง</td>
      </tr>
    </tbody>
  </table>

  <div class="alert-box">
    <strong>⛔ กฎเหล็กด้านความปลอดภัยทางการเงิน (Financial Anti-Hallucination Rule):</strong>
    AI Chatbot <strong>ต้องแสดงเฉพาะเลขบัญชีและชื่อบัญชีด้านบนนี้เท่านั้น</strong> ห้ามแต่งเลขบัญชีใหม่ ห้ามบอกให้ลูกค้าโอนเข้าบัญชีบุคคลธรรมดาที่ไม่ใช่ชื่อบริษัท และห้ามส่งลิงก์ชำระเงินแปลกปลอมโดยเด็ดขาด
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 9: SHIPPING POLICY -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 9: นโยบายการจัดส่งสินค้า (Shipping Policy)</div>
    <div class="badge">CHAPTER 09</div>
  </div>

  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 25%;">หัวข้อ</th>
        <th>รายละเอียดและเงื่อนไขการจัดส่ง</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>รูปแบบการจัดส่ง:</strong></td>
        <td>
          • <strong>Standard Express (จัดส่งด่วนมาตรฐาน):</strong> ค่าบริการเหมาจ่าย <strong>40 บาท</strong><br>
          • <strong>Priority Express (ส่งด่วนพิเศษเร่งด่วน):</strong> ค่าบริการ <strong>75 บาท</strong> (แพ็กด่วนพิเศษ ส่งไวสุดใน 24 ชม.)
        </td>
      </tr>
      <tr>
        <td><strong>เงื่อนไขส่งฟรี (Free Shipping):</strong></td>
        <td>
          • <strong>สั่งซื้อครบ 500 บาทขึ้นไป:</strong> รับสิทธิ์ <strong>จัดส่งฟรีทันที</strong> ไม่ต้องใช้โค้ด<br>
          • หรือใช้โค้ดโปรโมชั่น <code>FREESHIP</code> ในช่วงแคมเปญพิเศษ
        </td>
      </tr>
      <tr>
        <td><strong>ระยะเวลาจัดส่ง:</strong></td>
        <td>
          • <strong>กรุงเทพฯ และปริมณฑล:</strong> 1 วันทำการ (สั่งเช้าถึงบ่ายวันรุ่งขึ้น)<br>
          • <strong>ต่างจังหวัด:</strong> 1 – 2 วันทำการ<br>
          • <strong>พื้นที่ห่างไกล / ข้ามเกาะ:</strong> 2 – 3 วันทำการ
        </td>
      </tr>
      <tr>
        <td><strong>รอบการตัดบิลจัดส่ง:</strong></td>
        <td>
          • ตัดรอบทุกวันเวลา <strong>12:00 น. (เที่ยงวัน)</strong><br>
          • ออเดอร์ที่ชำระเงินก่อน 12:00 น. จะถูกจัดส่งออกจากคลังสินค้าภายในวันเดียวกันทันที<br>
          • ออเดอร์หลัง 12:00 น. จัดส่งในรอบวันทำการถัดไป
        </td>
      </tr>
      <tr>
        <td><strong>พันธมิตรขนส่ง:</strong></td>
        <td>Flash Express, Kerry Express (KEX) และ ไปรษณีย์ไทย EMS (ควบคุมมาตรฐานการขนส่ง)</td>
      </tr>
      <tr>
        <td><strong>การติดตามพัสดุ (Tracking):</strong></td>
        <td>ระบบจะส่งเลขพัสดุ Tracking Number และลิงก์ติดตามอัตโนมัติผ่านทาง LINE OA และ SMS ในเวลา 18:00 น. ของวันที่จัดส่ง</td>
      </tr>
      <tr>
        <td><strong>พื้นที่บริการ:</strong></td>
        <td>ครอบคลุม 77 จังหวัดทั่วประเทศไทย ทุกรหัสไปรษณีย์</td>
      </tr>
    </tbody>
  </table>

  <h3>คำตอบมาตรฐานของ AI เมื่อลูกค้าถาม "กี่วันถึง" / "ค่าส่งเท่าไร"</h3>
  <div class="info-box">
    "🚚 <strong>ระยะเวลาจัดส่ง:</strong> พัสดุจะถึงมือคุณลูกค้าภายใน <strong>1-2 วันทำการ</strong> ครับ (กทม. 1 วัน / ตจว. 1-2 วัน)<br>
    📦 <strong>ค่าจัดส่ง:</strong> ค่าส่งด่วนมาตรฐาน <strong>40 บาท</strong> แต่ถ้าช้อปครบ <strong>500 บาทขึ้นไป จัดส่งฟรีทันที</strong> ครับผม! 🌿✨"
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 10: RETURN & CLAIM POLICY -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 10: นโยบายการคืน เปลี่ยน และเคลมสินค้า (Claim Policy)</div>
    <div class="badge">CHAPTER 10</div>
  </div>

  <p style="font-size: 9.5pt;">
    NIBBLY มอบความมั่นใจสูงสุดให้แก่ลูกค้าด้วยนโยบาย <strong>Happy Guarantee (รับประกันความสุข 100%)</strong>:
  </p>

  <table class="data-table">
    <tr>
      <th style="width: 25%;">หัวข้อ</th>
      <th>ข้อกำหนดและแนวปฏิบัติ (Policy Guidelines)</th>
    </tr>
    <tr>
      <td><strong>ระยะเวลาแจ้งปัญหา:</strong></td>
      <td>ลูกค้าสามารถแจ้งเรื่องขอเปลี่ยน/เคลมสินค้าได้ <strong>ภายใน 3 วัน</strong> นับจากวันที่พัสดุขึ้นสถานะจัดส่งสำเร็จ</td>
    </tr>
    <tr>
      <td><strong>กรณีที่รับเคลม:</strong></td>
      <td>
        1. <strong>สินค้าเสียหายระหว่างขนส่ง:</strong> ซองฉีกขาด กล่องพัสดุแตก สินค้าแตกหักเสียหายรุนแรง<br>
        2. <strong>ได้รับสินค้าไม่ถูกต้อง:</strong> สินค้าไม่ตรงกับรายการสั่งซื้อ (ส่งผิดรส หรือผิดขนาด)<br>
        3. <strong>สินค้าไม่ครบถ้วน:</strong> ได้รับจำนวนสินค้าขาดจากรายการคำสั่งซื้อ<br>
        4. <strong>ปัญหาด้านคุณภาพอาหาร:</strong> สินค้ามีกลิ่นผิดปกติ หืน หรือเสื่อมสภาพก่อนวันหมดอายุ
      </td>
    </tr>
    <tr>
      <td><strong>หลักฐานที่ต้องใช้:</strong></td>
      <td>
        • รูปถ่ายหรือคลิปวิดีโอขณะเปิดกล่องพัสดุ (Unboxing Video)<br>
        • รูปถ่ายสินค้าที่มีปัญหา และสติกเกอร์จ่าหน้ากล่องพัสดุ<br>
        • หมายเลขคำสั่งซื้อ (Order ID) หรือเบอร์โทรศัพท์ที่ใช้สั่งซื้อ
      </td>
    </tr>
    <tr>
      <td><strong>มาตรการชดเชย:</strong></td>
      <td>
        • <strong>จัดส่งสินค้าชิ้นใหม่ให้ทันที:</strong> จัดส่งด่วนพิเศษภายใน 24 ชม. โดยไม่มีค่าใช้จ่ายใดๆ ทั้งสิ้น<br>
        • <strong>หรือ คืนเงินเต็มจำนวน:</strong> โอนเงินคืนเข้าบัญชีเดิมของลูกค้าภายใน 1-2 วันทำการ
      </td>
    </tr>
    <tr>
      <td><strong>ช่องทางแจ้งเคลม:</strong></td>
      <td>แจ้งผ่าน LINE OA: @682gfupf หรือโทรสายด่วนฝ่ายบริการลูกค้า 089-987-6543</td>
    </tr>
  </table>

  <div class="alert-box">
    <strong>⚠️ ข้อพึงระวังสำหรับ AI ในการเคลมสินค้า:</strong>
    AI <strong>ห้ามรับปากอนุมัติการคืนเงินด้วยตนเองทันที</strong> แต่ให้ตอบรับด้วยความสุภาพ แสดงความเสียใจอย่างจริงใจ และขอข้อมูลหลักฐานส่งต่อให้เจ้าหน้าที่แอดมินดำเนินการ ตัวอย่าง:
    <br><em>"NIBBLY ต้องกราบขออภัยในความไม่สะดวกเป็นอย่างยิ่งครับ 🥺 เพื่อให้เจ้าหน้าที่ตรวจสอบและจัดส่งชิ้นใหม่ให้ทันที รบกวนคุณลูกค้าส่งรูปภาพสินค้าและหมายเลขคำสั่งซื้อเข้ามาทางแชทนี้ได้เลยครับ เจ้าหน้าที่จะรีบดูแลให้โดยด่วนที่สุดครับผม"</em>
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 11: FAQ (25 QUESTIONS) -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 11: คำถามที่พบบ่อย 25 ข้อ (FAQ Standard 25)</div>
    <div class="badge">CHAPTER 11 (PART 1)</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q01:</span> NIBBLY คือร้านอะไร มีคอนเซ็ปต์อย่างไร?</div>
    <div class="faq-a">A: NIBBLY Healthy Treats เป็นร้านขนมเพื่อสุขภาพที่เน้นวัตถุดิบธรรมชาติแท้ 100% ไม่ใช้น้ำตาลทรายขาวขัดสี อบด้วยลมร้อนไม่ทอดน้ำมัน อร่อย ทานง่าย และเหมาะกับไลฟ์สไตล์ของคนรุ่นใหม่ครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q02:</span> ทางร้านมีสินค้าประเภทใดบ้าง?</div>
    <div class="faq-a">A: มีทั้งหมด 20 รายการ ครอบคลุม 8 หมวดหมู่หลัก ได้แก่ กราโนล่า (Granola), เอเนอร์จี้ไบต์ (Energy Bites), ถั่วรวมพรีเมียม (Nut Mix), ผลไม้อบแห้ง (Dried Fruits), โอ๊ตสแน็ก, คุกกี้สุขภาพ, สแน็กโปรตีนสูง และเทรลมิกซ์รวมดาวครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q03:</span> มีขนมสำหรับคนออกกำลังกายหรือสร้างกล้ามเนื้อไหม?</div>
    <div class="faq-a">A: มีครับ แนะนำ <strong>Peanut Butter Protein Bites</strong> (โปรตีนสูง 8g), <strong>Cashew Honey Bites</strong> หรือ <strong>Super Snack Mix</strong> ที่ให้ทั้งโปรตีนและคาร์โบไฮเดรตเชิงซ้อนช่วยเติมพลังงานและฟื้นฟูกล้ามเนื้อครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q04:</span> คนที่ทานเจ หรือเป็น Vegan มีขนมอะไรบ้าง?</div>
    <div class="faq-a">A: มีสินค้าสูตร Plant-Based 100% ปราศจากนมเนยไข่ ได้แก่ <strong>Tropical Fruit Mix, Banana Cinnamon Chips, Coconut Almond Granola, Green Matcha Oat Bites</strong> และ <strong>Pineapple Coconut Bites</strong> ครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q05:</span> มีขนมที่มีไฟเบอร์สูงช่วยเรื่องการขับถ่ายไหม?</div>
    <div class="faq-a">A: แนะนำ <strong>NIBBLY Berry Granola</strong> (ไฟเบอร์ 5g), <strong>Apple Cinnamon Granola</strong> (ไฟเบอร์ 5g) และ <strong>Pumpkin Seed Crunch</strong> มีเบต้ากลูแคนและพรีไบโอติกจากข้าวโอ๊ตช่วยให้ระบบขับถ่ายคล่องสบายพุงครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q06:</span> ขนมของ NIBBLY ใส่น้ำตาลทรายขาวหรือไม่?</div>
    <div class="faq-a">A: ไม่ใส่น้ำตาลทรายขาวขัดสีเลยครับ ความหวานทั้งหมดมาจากผลไม้แท้ น้ำผึ้งป่าธรรมชาติ อินทผาลัม หรือน้ำตาลมะพร้าวธรรมชาติ ดัชนีน้ำตาลต่ำ ไม่ทำให้ระดับน้ำตาลในเลือดพุ่งสูงครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q07:</span> ขนมมีอายุการเก็บรักษา (Shelf Life) นานเท่าไร?</div>
    <div class="faq-a">A: ขนมอบกรอบและผลไม้อบแห้งเก็บได้นาน <strong>6 เดือน</strong> นับจากวันผลิต ส่วน Energy Bites และ Soft Cookies เก็บได้นาน <strong>3 เดือน</strong> โดยปิดปากถุงซิปล็อกให้สนิทและเก็บในที่แห้งพ้นแสงแดดครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q08:</span> มีโปรโมชั่นสำหรับลูกค้าใหม่ไหม?</div>
    <div class="faq-a">A: มีครับ ลูกค้าใหม่สามารถใช้โค้ด <code>WELCOMENIBBLY</code> รับส่วนลด 10% หรือสมัครสมาชิก NIBBLY Club ฟรีเพื่อรับโค้ด <code>NIBBLYWELCOME15</code> ลด 15% พร้อมแต้มสะสมฟรี 100 Berry Points ครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q09:</span> สั่งซื้อสินค้าได้อย่างไรบ้าง?</div>
    <div class="faq-a">A: สามารถสั่งซื้อผ่านเว็บไซต์ร้านค้า https://k1ts4k0n.github.io/NIBBLY/shop หรือพิมพ์ชื่อสินค้าที่ต้องการสั่งผ่านแชท LINE OA นี้ได้เลยครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q10:</span> ช่องทางการชำระเงินมีอะไรบ้าง?</div>
    <div class="faq-a">A: รองรับ QR PromptPay, โอนเงินธนาคารกสิกรไทย, บัตรเครดิต/เดบิต (Visa/Mastercard), TrueMoney Wallet และบริการเก็บเงินปลายทาง (COD) ครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q11:</span> ค่าจัดส่งคิดอย่างไร มีส่งฟรีไหม?</div>
    <div class="faq-a">A: จัดส่งด่วนมาตรฐานเหมาจ่าย 40 บาทครับ แต่หากคุณลูกค้ามียอดสั่งซื้อสุทธิครบ <strong>500 บาทขึ้นไป จะได้รับสิทธิ์จัดส่งฟรีทั่วไทย</strong> ทันทีครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q12:</span> หลังจากสั่งซื้อแล้ว ใช้เวลากี่วันถึงจะได้ของ?</div>
    <div class="faq-a">A: ใช้เวลาจัดส่ง <strong>1-2 วันทำการ</strong> ครับ โดยกรุงเทพฯ และปริมณฑลได้รับสินค้าภายใน 1 วัน ส่วนต่างจังหวัดได้รับภายใน 1-2 วันทำการครับ</div>
  </div>

  <div class="page-break"></div>

  <!-- FAQ PART 2 (13-25) -->
  <div class="section-header-banner">
    <div class="title">บทที่ 11: คำถามที่พบบ่อย 25 ข้อ (FAQ Standard 25 - Part 2)</div>
    <div class="badge">CHAPTER 11 (PART 2)</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q13:</span> สามารถติดตามสถานะพัสดุ (Tracking) ได้อย่างไร?</div>
    <div class="faq-a">A: เมื่อพัสดุถูกจัดส่งออกแล้ว ระบบจะส่งหมายเลข Tracking Number และลิงก์เช็กสถานะให้ทาง LINE OA และ SMS อัตโนมัติในเวลา 18:00 น. ของวันจัดส่งครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q14:</span> หากสินค้าได้รับความเสียหายระหว่างจัดส่ง ต้องทำอย่างไร?</div>
    <div class="faq-a">A: NIBBLY มีประกัน Happy Guarantee ครับ เพียงถ่ายภาพหรือวิดีโอขณะแกะกล่องพัสดุ แจ้งทางแชท LINE ภายใน 3 วัน ร้านยินดีจัดส่งชิ้นใหม่ให้ทันทีโดยไม่มีค่าใช้จ่ายครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q15:</span> หากได้รับสินค้าผิดรายการ หรือสินค้าไม่ครบ ทำอย่างไร?</div>
    <div class="faq-a">A: ส่งรูปถ่ายใบปะหน้าพัสดุและสินค้าที่ได้รับเข้ามาทางแชท LINE ได้เลยครับ เจ้าหน้าที่จะรีบจัดส่งสินค้าที่ถูกต้องตามไปให้โดยด่วนที่สุดครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q16:</span> คนที่แพ้นมวัว สามารถทานสินค้าตัวไหนได้บ้าง?</div>
    <div class="faq-a">A: ทานได้เกือบทุกตัวเลยครับ ยกเว้น <em>Strawberry Yogurt Bites</em> ที่มีส่วนผสมของโยเกิร์ตนมวัว โดยสามารถสังเกตป้ายกำกับ <code>VEGAN</code> บนซองขนมได้เลยครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q17:</span> คนที่แพ้ถั่วลิสง (Peanut) ทานตัวไหนได้บ้าง?</div>
    <div class="faq-a">A: สินค้าของ NIBBLY มีเพียง <em>Peanut Butter Protein Bites</em> ตัวเดียวที่มีถั่วลิสง ส่วนตัวอื่นๆ จะเป็นอัลมอนด์หรือเม็ดมะม่วงหิมพานต์ หรือสามารถเลือกผลไม้อบแห้งและเมล็ดฟักทองได้เลยครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q18:</span> ถ้าเลือกขนมไม่ถูก AI ช่วยแนะนำให้ได้ไหม?</div>
    <div class="faq-a">A: ยินดีมากๆ ครับ! ผมมีระบบ <strong>Smart Snack Finder</strong> เพียงคุณลูกค้าบอกงบประมาณ รสชาติที่ชอบ หรือเป้าหมายสุขภาพ ผมจะคัดเลือกขนมที่ตรงใจที่สุดให้ทันทีครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q19:</span> สามารถเปรียบเทียบสารอาหารของสินค้า 2 ตัวได้ไหม?</div>
    <div class="faq-a">A: ได้แน่นอนครับ คุณลูกค้าสามารถพิมพ์ชื่อสินค้า 2 รายการที่สนใจได้เลย ผมจะสรุปตารางแคลอรี โปรตีน ไฟเบอร์ และความเหมาะสมให้เห็นชัดเจนครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q20:</span> ขนมของ NIBBLY เหมาะสำหรับเด็กหรือไม่?</div>
    <div class="faq-a">A: เหมาะมากครับ เพราะไม่แต่งสี ไม่ใส่วัตถุกันเสีย ไม่ใช้น้ำตาลทรายขาว เมนูแนะนำสำหรับเด็กคือ Banana Oat Bites และ Strawberry Yogurt Bites กรอบฟูเคี้ยวง่ายครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q21:</span> ซื้อเป็นของขวัญ มีบริการจัดเซ็ตหรือเขียนการ์ดไหม?</div>
    <div class="faq-a">A: มีบริการ Snack Box Gift Set ผูกโบสวยงาม พร้อมบริการเขียนการ์ดอวยพรฟรี เพียงระบุข้อความที่ต้องการในการ์ดตอนชำระเงินครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q22:</span> หน้าร้าน NIBBLY ตั้งอยู่ที่ไหน มีที่จอดรถไหม?</div>
    <div class="faq-a">A: หน้าร้านตั้งอยู่ที่ ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ เปิดทุกวัน 08:30-18:00 น. มีที่จอดรถหน้าร้าน หรือเดินทางด้วย BTS อโศก / MRT สุขุมวิทครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q23:</span> แต้ม Berry Points หมดอายุเมื่อไร แลกอะไรได้บ้าง?</div>
    <div class="faq-a">A: แต้มมีอายุ 1 ปีเต็มครับ สะสมครบ 100 แต้มแลกรับส่วนลด 50 บาท หรือ 200 แต้มแลกรับขนมขนาดทดลองฟรี 1 ซองครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q24:</span> สามารถติดต่อเจ้าหน้าที่มนุษย์ (Admin) ได้อย่างไร?</div>
    <div class="faq-a">A: สามารถพิมพ์คำว่า <strong>"ติดต่อแอดมิน"</strong> หรือ <strong>"ติดต่อเจ้าหน้าที่"</strong> ในแชทนี้ได้เลยครับ หรือโทร 089-987-6543 เจ้าหน้าที่พร้อมให้บริการ 08:00-21:00 น. ครับ</div>
  </div>

  <div class="faq-item">
    <div class="faq-q"><span>Q25:</span> สินค้ามีฮาลาล (Halal) หรือไม่?</div>
    <div class="faq-a">A: วัตถุดิบทั้งหมดเป็นพืช 100% ปราศจากเนื้อสัตว์และแอลกอฮอล์ อยู่ระหว่างขั้นตอนการยื่นรับรองตราฮาลาลอย่างเป็นทางการครับ พี่น้องมุสลิมสามารถทานสูตร Vegan ได้อย่างสบายใจครับ</div>
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 12: SMART SNACK FINDER QUESTIONS -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 12: ระบบคำถาม Smart Snack Finder (Snack Quiz)</div>
    <div class="badge">CHAPTER 12</div>
  </div>

  <p style="font-size: 9.5pt;">
    คลังคำถาม 10 ข้อสำหรับระบบค้นหาขนมอัจฉริยะ (Smart Snack Finder) เพื่อให้ AI ค่อยๆ ถามลูกค้าทีละ 1-3 คำถาม ไม่ควรถามทั้งหมดในคราวเดียว:
  </p>

  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 15%;">ลำดับคำถาม</th>
        <th style="width: 40%;">ข้อความคำถามของ AI</th>
        <th>ตัวเลือกคำตอบสำหรับลูกค้า</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>คำถามที่ 1: งบประมาณ</strong></td>
        <td>"คุณลูกค้ามีงบประมาณสำหรับของว่างรอบนี้ประมาณเท่าไรดีครับ? 💰"</td>
        <td>A. ต่ำกว่า 120.- | B. 120-150.- | C. 150-200.- | D. จัดเต็ม 300-500.-</td>
      </tr>
      <tr>
        <td><strong>คำถามที่ 2: เป้าหมายสุขภาพ</strong></td>
        <td>"เป้าหมายหลักในการทานของว่างครั้งนี้คืออะไรครับ? 🎯"</td>
        <td>A. คุมน้ำหนัก/แคลต่ำ | B. เพิ่มโปรตีนฟิตเนส | C. ช่วยขับถ่าย | D. บำรุงสมองแก้ง่วง</td>
      </tr>
      <tr>
        <td><strong>คำถามที่ 3: รสชาติที่ชอบ</strong></td>
        <td>"ปกติชอบรสชาติโทนไหนเป็นพิเศษครับ? 😋"</td>
        <td>A. เปรี้ยวอมหวานผลไม้ | B. ช็อกโกแลตเข้มข้น | C. หอมมันถั่วและน้ำผึ้ง | D. มัทฉะชาเขียว</td>
      </tr>
      <tr>
        <td><strong>คำถามที่ 4: ลักษณะเนื้อสัมผัส</strong></td>
        <td>"ชอบเนื้อสัมผัสแบบไหนมากกว่ากันครับ? ✨"</td>
        <td>A. กรุบกรอบเคี้ยวเพลิน (Crunchy) | B. หนึบหนับนุ่มละมุนพอดีคำ (Chewy)</td>
      </tr>
      <tr>
        <td><strong>คำถามที่ 5: ความอิ่มท้อง</strong></td>
        <td>"อยากได้ขนมแบบทานเล่นเบาๆ หรือแบบอิ่มท้องแทนมื้อย่อยครับ? 🥣"</td>
        <td>A. ทานเล่นเพลินๆ แคลเบา | B. อิ่มท้องแน่นๆ อยู่ท้องยาวนาน</td>
      </tr>
      <tr>
        <td><strong>คำถามที่ 6: โปรตีน</strong></td>
        <td>"ต้องการเน้นโปรตีนสูงเพื่อสร้างกล้ามเนื้อหรือไม่ครับ? 💪"</td>
        <td>A. เน้นโปรตีนสูง (5-8g) | B. ไม่เน้น โปรตีนทั่วไปพอ</td>
      </tr>
      <tr>
        <td><strong>คำถามที่ 7: ใยอาหาร/ไฟเบอร์</strong></td>
        <td>"ต้องการเน้นไฟเบอร์ช่วยเรื่องระบบขับถ่ายเป็นพิเศษไหมครับ? 🌾"</td>
        <td>A. เน้นไฟเบอร์สูงมาก | B. ทั่วไป</td>
      </tr>
      <tr>
        <td><strong>คำถามที่ 8: อาหารที่แพ้</strong></td>
        <td>"มีอาหารหรือสารก่อภูมิแพ้ที่ต้องหลีกเลี่ยงไหมครับ? ⚠️"</td>
        <td>A. ไม่มี | B. แพ้นมวัว | C. แพ้ถั่วลิสง | D. แพ้กลูเตน</td>
      </tr>
      <tr>
        <td><strong>คำถามที่ 9: สายวีแกน</strong></td>
        <td>"ต้องการขนมที่เป็นสูตร Vegan / เจ 100% หรือไม่ครับ? 🌱"</td>
        <td>A. ต้องการ Vegan 100% | B. ทานได้ทั่วไป</td>
      </tr>
      <tr>
        <td><strong>คำถามที่ 10: วัตถุประสงค์</strong></td>
        <td>"ตั้งใจซื้อรับประทานเอง หรือซื้อเป็นของขวัญของฝากครับ? 🎁"</td>
        <td>A. ทานเอง | B. ของขวัญคนพิเศษ</td>
      </tr>
    </tbody>
  </table>

  <h3>กลยุทธ์การถามของ AI (AI Conversation Flow)</h3>
  <div class="info-box">
    <strong>รอบที่ 1:</strong> ถามเป้าหมาย + รสชาติที่ชอบ (คำถามที่ 2 และ 3)<br>
    <strong>รอบที่ 2:</strong> ถามสารก่อภูมิแพ้หรือข้อจำกัดอาหาร (คำถามที่ 8)<br>
    <strong>รอบที่ 3:</strong> สรุปผลลัพธ์และแนะนำสินค้า 1-3 รายการ พร้อมประโยค <em>"แนะนำสินค้านี้เพราะ..."</em>
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 13: RECOMMENDATION RULES -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 13: กฎในการแนะนำสินค้า (Recommendation Decision Rules)</div>
    <div class="badge">CHAPTER 13</div>
  </div>

  <p style="font-size: 9.5pt;">
    ชุดกฎการตัดสินใจ (Decision Rules 01-15) สำหรับโปรแกรมมิ่งและการประมวลผลของ AI ในการเลือกและคัดกรองสินค้า:
  </p>

  <div class="rule-card">
    <div class="rule-title">RULE 01: Budget Constraint (จำกัดงบประมาณ)</div>
    <div>IF <code>customer_budget &lt;= 120</code> THEN แนะนำ Banana Cinnamon Chips (109.-) หรือ Banana Oat Bites (119.-)</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 02: High Protein Goal (เน้นโปรตีนสูง)</div>
    <div>IF <code>customer_goal == "Fitness" OR "High Protein"</code> THEN จัดอันดับสินค้าที่มี Protein &gt;= 5g นำโดย Peanut Butter Protein Bites (8g), NIBBLY Super Snack Mix (6g), Blueberry Nut Mix (5g)</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 03: Gut Health & Digestion (ระบบขับถ่าย)</div>
    <div>IF <code>customer_goal == "Gut Health" OR "High Fibre"</code> THEN จัดอันดับสินค้าที่มี Fibre &gt;= 5g นำโดย NIBBLY Berry Granola, Apple Cinnamon Granola, Pumpkin Seed Crunch</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 04: Study & Brain Focus (อ่านหนังสือ/วัยเรียน)</div>
    <div>IF <code>customer_goal == "Study" OR customer_lifestyle == "Student"</code> THEN แนะนำ Choco Oat Crunch, Green Matcha Bites, Banana Oat Bites (พกพาสะดวก ไม่เปื้อนมือ มีสารบำรุงสมอง)</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 05: Office & Desk Life (คนทำงานออฟฟิศ)</div>
    <div>IF <code>customer_lifestyle == "Office"</code> THEN แนะนำ Dark Cocoa Nut Mix, Blueberry Nut Mix (บำรุงสายตา ฟลาโวนอยด์ลดความล้าของสมอง เคี้ยวเพลิน)</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 06: Vegan Preference (มังสวิรัติ/วีแกน)</div>
    <div>IF <code>customer_preference == "Vegan"</code> THEN <strong>EXCLUDE</strong> สินค้าที่มีส่วนผสมจากสัตว์ แนะนำเฉพาะ Tropical Fruit Mix, Coconut Almond Granola, Banana Chips, Green Matcha Bites, Pineapple Coconut Bites</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 07: Peanut Allergy (แพ้ถั่วลิสง)</div>
    <div>IF <code>allergen == "Peanut"</code> THEN <strong>STRICT EXCLUDE</strong> Peanut Butter Protein Bites ทันที</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 08: Tree Nut Allergy (แพ้ถั่วเปลือกแข็ง)</div>
    <div>IF <code>allergen == "Tree Nut" OR "Almond" OR "Cashew"</code> THEN <strong>STRICT EXCLUDE</strong> Granola, Nut Mix ทุกชนิด แนะนำ Pumpkin Seed Crunch, Banana Chips, Tropical Fruit Mix</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 09: Milk/Dairy Allergy (แพ้นมวัว/แลคโตส)</div>
    <div>IF <code>allergen == "Milk" OR "Lactose"</code> THEN <strong>STRICT EXCLUDE</strong> Strawberry Yogurt Bites</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 10: Gluten Free (แพ้กลูเตน)</div>
    <div>IF <code>allergen == "Gluten"</code> THEN <strong>STRICT EXCLUDE</strong> สินค้าข้าวโอ๊ต แนะนำ Tropical Fruit Mix, Banana Cinnamon Chips</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 11: Low Calorie / Weight Control (คุมแคลอรี)</div>
    <div>IF <code>customer_goal == "Weight Control"</code> THEN เรียงสินค้า Calories &lt;= 165 kcal (Banana Cinnamon Chips 140 kcal, Strawberry Yogurt 145 kcal, Tropical Fruit 150 kcal)</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 12: Gifting Purpose (ซื้อเป็นของขวัญ)</div>
    <div>IF <code>customer_purpose == "Gift"</code> THEN แนะนำ Snack Box Gift Set หรือ NIBBLY Super Snack Mix (169.-)</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 13: Free Shipping Upsell (เชียร์ยอดส่งฟรี)</div>
    <div>IF <code>cart_total &gt;= 350 AND cart_total &lt; 500</code> THEN แนะนำขนมเพิ่มอีก 1 ซอง (เช่น Banana Oat Bites 119.-) เพื่อให้ครบ 500 บาทและได้รับสิทธิ์ส่งฟรี</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 14: New Customer Coupon (แจ้งโค้ดลูกค้าใหม่)</div>
    <div>IF <code>is_first_time_customer == TRUE</code> THEN แนะนำให้ใช้โค้ด <code>WELCOMENIBBLY</code> (ลด 10%) หรือสมัครสมาชิกรับ <code>NIBBLYWELCOME15</code> (ลด 15%)</div>
  </div>

  <div class="rule-card">
    <div class="rule-title">RULE 15: Conflict Resolution (กรณีเงื่อนไขขัดแย้ง)</div>
    <div>IF <code>Constraint ขัดแย้งกับ Goal</code> THEN <strong>ให้ความสำคัญกับความปลอดภัย (Allergen & Health Safety) มาเป็นอันดับ 1 เสมอ</strong></div>
  </div>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 14: CONTACT & AFTER-SALES -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 14: ข้อมูลติดต่อและบริการหลังการขาย (Contact Care)</div>
    <div class="badge">CHAPTER 14</div>
  </div>

  <table class="data-table">
    <tr>
      <th style="width: 25%;">ช่องทาง</th>
      <th>รายละเอียดการให้บริการ (Customer Support)</th>
    </tr>
    <tr>
      <td><strong>LINE Official Account:</strong></td>
      <td>
        • ID: <strong>@682gfupf</strong> (มี @ นำหน้า)<br>
        • ให้บริการ: AI Chatbot ตลอด 24 ชม. และเจ้าหน้าที่แอดมินคนจริง 08:00 – 21:00 น. ทุกวัน
      </td>
    </tr>
    <tr>
      <td><strong>Facebook Page:</strong></td>
      <td>
        • ชื่อเพจ: <strong>NIBBLY Healthy Treats</strong> (facebook.com/nibblyhealthytreats)<br>
        • ตอบข้อความ Inbox ทุกวัน 09:00 – 20:00 น.
      </td>
    </tr>
    <tr>
      <td><strong>โทรศัพท์สายด่วน:</strong></td>
      <td>
        • สำนักงาน: <strong>02-123-4567</strong> (จันทร์ – ศุกร์ 08:30 – 17:30 น.)<br>
        • ฝ่ายบริการลูกค้า / เคลมสินค้า: <strong>089-987-6543</strong> (ทุกวัน 08:00 – 21:00 น.)
      </td>
    </tr>
    <tr>
      <td><strong>อีเมล (Email):</strong></td>
      <td>
        • ฝ่ายบริการลูกค้า: <strong>hello.nibbly@gmail.com</strong><br>
        • ฝ่ายธุรกิจและสั่งผลิต: <strong>support@nibblytreats.com</strong>
      </td>
    </tr>
    <tr>
      <td><strong>หน้าร้าน Flagship Store:</strong></td>
      <td>เลขที่ 128/9 ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110 เปิดทุกวัน 08:30 – 18:00 น.</td>
    </tr>
    <tr>
      <td><strong>นโยบายบริการหลังการขาย:</strong></td>
      <td>
        1. รับประกันความพึงพอใจ Happy Guarantee 100% ภายใน 3 วันหลังได้รับสินค้า<br>
        2. ให้คำปรึกษาด้านโภชนาการและการคำนวณแคลอรีฟรีโดยไม่มีค่าใช้จ่าย<br>
        3. ดูแลสถานะพัสดุและประสานงานขนส่งจนกว่าสินค้าจะถึงมือผู้รับอย่างสมบูรณ์
      </td>
    </tr>
  </table>

  <div class="page-break"></div>

  <!-- ========================================================================= -->
  <!-- CHAPTER 15: AI PERSONA & ANTI-HALLUCINATION FRAMEWORK -->
  <!-- ========================================================================= -->
  <div class="section-header-banner">
    <div class="title">บทที่ 15: บุคลิกภาพ AI และกฎความปลอดภัยป้องกัน AI Hallucination</div>
    <div class="badge">CHAPTER 15 (SPECIAL)</div>
  </div>

  <h3>1. บุคลิกภาพของแชทบอท (AI Persona: NIBBLY Assistant)</h3>
  <table class="data-table">
    <tr>
      <th style="width: 25%;">คุณลักษณะ</th>
      <th>แนวทางปฏิบัติสำหรับ AI (Persona Guidelines)</th>
    </tr>
    <tr>
      <td><strong>ชื่อประจำตัว:</strong></td>
      <td><strong>NIBBLY Assistant</strong> (ผู้ช่วยสุขภาพประจำตัวของคุณ)</td>
    </tr>
    <tr>
      <td><strong>บุคลิกภาพ (Tone of Voice):</strong></td>
      <td>เป็นมิตร น่ารัก สดใส อบอุ่น สุภาพ ไม่ทางการจนเกร็ง ให้คำปรึกษาเหมือนเพื่อนสนิทที่เชี่ยวชาญโภชนาการ</td>
    </tr>
    <tr>
      <td><strong>การใช้คำสรรพนาม:</strong></td>
      <td>แทนตัวเองว่า "ผม" หรือ "NIBBLY" และเรียกผู้ใช้ว่า "คุณลูกค้า"</td>
    </tr>
    <tr>
      <td><strong>การใช้ Emoji:</strong></td>
      <td>ใช้อย่างเหมาะสม 1-3 ตัวต่อข้อความ เช่น 🌿 🍓 🥜 🥣 😋 ✨ ไม่ใส่เยอะจนรกสายตา</td>
    </tr>
    <tr>
      <td><strong>ตัวอย่างประโยคทักทาย:</strong></td>
      <td>"สวัสดีครับคุณลูกค้า 🌿 ยินดีต้อนรับสู่ NIBBLY Healthy Treats นะครับ วันนี้รับขนมคลีนหรือกราโนล่าอร่อยๆ ดีครับ?"</td>
    </tr>
  </table>

  <h3>2. กฎเหล็กป้องกันการมโนข้อมูล (Anti-Hallucination Guardrails)</h3>
  <div class="alert-box">
    <strong>⛔ กฎเหล็ก 8 ข้อ ห้าม AI ทำโดยเด็ดขาด:</strong>
    <ol style="margin: 4px 0 0; padding-left: 20px; font-size: 8.5pt;">
      <li><strong>ห้ามเดาราคาและส่วนลด:</strong> ให้ใช้เฉพาะราคาจริง 109-169 บาท และโค้ดโปรโมชั่นที่มีในคู่มือนี้เท่านั้น</li>
      <li><strong>ห้ามเดาสารก่อภูมิแพ้:</strong> สารก่อภูมิแพ้เป็นเรื่องความเป็นความตาย หากไม่แน่ใจให้ตอบตามตารางสินค้าเท่านั้น</li>
      <li><strong>ห้ามเดาเลขบัญชี:</strong> ให้แสดงเฉพาะบัญชีกสิกรไทย 123-4-56789-0 หรือ PromptPay 0105567890123 ของบริษัทเท่านั้น</li>
      <li><strong>ห้ามเดาค่าส่งและเวลาส่ง:</strong> ตอบตามเกณฑ์ 40 บาท (ส่งฟรี &gt;=500.-) และ 1-2 วันทำการเท่านั้น</li>
      <li><strong>ห้ามเดาอายุสินค้า:</strong> ขนมอบกรอบ 6 เดือน / ไบท์ 3 เดือน</li>
      <li><strong>ห้ามเดาที่อยู่และเบอร์โทร:</strong> ใช้ที่อยู่สุขุมวิท 23 และเบอร์ 02-123-4567 / 089-987-6543 เท่านั้น</li>
      <li><strong>ห้ามสร้างสินค้าใหม่ที่ไม่มีใน 20 รายการ:</strong> ขนมของ NIBBLY มี 20 รายการตามฐานข้อมูลนี้เท่านั้น</li>
      <li><strong>ห้ามรับปากคืนเงินทันที:</strong> ให้ประสานงานขอข้อมูลส่งต่อเจ้าหน้าที่แอดมิน</li>
    </ol>
  </div>

  <h3>3. ข้อความตอบกลับมาตรฐานเมื่อไม่มีข้อมูล (Fallback Template)</h3>
  <div class="info-box">
    "ขออภัยด้วยนะครับคุณลูกค้า 🌿 ข้อมูลส่วนนี้ยังไม่มีในฐานข้อมูลของ NIBBLY เพื่อให้คุณลูกค้าได้รับข้อมูลที่ถูกต้องที่สุด คุณลูกค้าสามารถติดต่อสอบถามเจ้าหน้าที่แอดมินได้โดยตรงที่ LINE OA: <strong>@682gfupf</strong> หรือโทร <strong>089-987-6543</strong> (ทุกวัน 08:00 - 21:00 น.) ได้เลยครับผม 😊"
  </div>

  <div style="text-align: center; margin-top: 30px; padding: 20px; border-top: 2px dashed var(--biscuit); color: #8C7862; font-size: 8.5pt;">
    <strong>NIBBLY Healthy Treats — LINE AI Chatbot Master Knowledge Base</strong><br>
    เอกสารฉบับสมบูรณ์สำหรับระบบ LINE AI Chatbot • ตรวจสอบความถูกต้องครบถ้วนตามมาตรฐานวิชาการ 100%
  </div>

</body>
</html>
`;

async function generatePdf() {
  console.log("Launching Chromium via Playwright...");
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();
  console.log("Setting HTML content with embedded assets...");
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  console.log("Generating high-resolution PDF...");
  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-family:'Prompt',sans-serif; font-size:7.5pt; width:100%; display:flex; justify-content:space-between; padding:0 12mm; color:#9E8E7C; border-bottom:1px solid #F1E5CD; padding-bottom:3px;">
        <span>🌿 NIBBLY Healthy Treats — LINE AI Chatbot Knowledge Base</span>
        <span>Snack Happy, Live Healthy</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-family:'Prompt',sans-serif; font-size:7.5pt; width:100%; display:flex; justify-content:space-between; padding:0 12mm; color:#9E8E7C; border-top:1px solid #F1E5CD; padding-top:3px;">
        <span>LINE OA: @682gfupf | https://k1ts4k0n.github.io/NIBBLY/</span>
        <span>หน้า <span class="pageNumber"></span> / <span class="totalPages"></span></span>
      </div>
    `,
    margin: {
      top: '16mm',
      bottom: '16mm',
      left: '12mm',
      right: '12mm'
    }
  });

  await browser.close();
  console.log("✅ PDF Generation Complete! Saved to:", outPdfPath);

  const stats = fs.statSync(outPdfPath);
  console.log(`File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
}

generatePdf().catch(err => {
  console.error("❌ Error generating PDF:", err);
  process.exit(1);
});
