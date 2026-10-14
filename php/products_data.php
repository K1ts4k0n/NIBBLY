<?php
/**
 * คลังข้อมูลสินค้าของ NIBBLY จากร้าน https://k1ts4k0n.github.io/NIBBLY/shop/
 * และฟังก์ชัน PHP ดึงข้อมูลสินค้าแนะนำตามความสนใจ
 */

// คลังสินค้าจริงของ NIBBLY Healthy Treats (ดึงมาจากเว็บของคุณ)
$nibbly_catalog = [
    [
        'id' => 'nibbly-berry-granola',
        'name' => 'NIBBLY Berry Granola',
        'category' => 'Granola (กราโนล่า)',
        'origin' => 'โอ๊ตเต็มเมล็ด, สตรอว์เบอร์รี, บลูเบอร์รี, อัลมอนด์',
        'notes' => 'เปรี้ยวอมหวานเบอร์รี่สดชื่น อัลมอนด์กรุบกรอบ ไร้น้ำตาลทรายขาว',
        'roast' => 'อบกรอบด้วยลมร้อน (Baked, Not Fried)',
        'aroma' => 'เบอร์รี่รวม & ข้าวโอ๊ตหอมละมุน',
        'body' => '175 kcal / ไฟเบอร์สูง 5g',
        'caffeine' => 'โปรตีน 5g / วิตามินและสารต้านอนุมูลอิสระ',
        'brew_methods' => 'ทานเล่นทันที, ผสมนมสด, หรือโรยบนโยเกิร์ต',
        'price' => 149,
        'image' => 'https://k1ts4k0n.github.io/NIBBLY/products/berry-granola.jpg',
        'local_file' => 'berry-granola.jpg',
        'url' => 'https://k1ts4k0n.github.io/NIBBLY/shop/nibbly-berry-granola/',
        'match_tags' => ['เบอร์รี่', 'ผลไม้', 'เปรี้ยวอมหวาน', 'ผิวพรรณสดใส', 'คุมน้ำหนัก', 'ขับถ่ายดี', 'กราโนล่า']
    ],
    [
        'id' => 'choco-oat-crunch',
        'name' => 'Choco Oat Crunch',
        'category' => 'Oat Snacks (โอ๊ตช็อกโกแลต)',
        'origin' => 'ดาร์กโกโก้แท้, ข้าวโอ๊ต, อัลมอนด์, ผลอินทผาลัม',
        'notes' => 'รสโกโก้เข้มข้น หวานธรรมชาติ ละมุน กรอบเพลิน ไม่รู้สึกผิด',
        'roast' => 'อบกรอบด้วยอุณหภูมิต่ำ คงคุณค่าสารอาหาร',
        'aroma' => 'ดาร์กช็อกโกแลตเข้มข้น',
        'body' => '172 kcal / แป้งต่ำ ไฟเบอร์ 4g',
        'caffeine' => 'โปรตีน 4g / ฟลาโวนอยด์จากโกโก้แท้',
        'brew_methods' => 'ทานเล่นแก้อยากของหวาน, ทานคู่นมข้าวโอ๊ต หรือกาแฟดำ',
        'price' => 139,
        'image' => 'https://k1ts4k0n.github.io/NIBBLY/products/choco.jpg',
        'local_file' => 'choco.jpg',
        'url' => 'https://k1ts4k0n.github.io/NIBBLY/shop/choco-oat-crunch/',
        'match_tags' => ['ช็อกโกแลต', 'โกโก้', 'ขม', 'เข้มข้น', 'คุมน้ำหนัก', 'บำรุงสมอง', 'ของหวานสุขภาพ']
    ],
    [
        'id' => 'dark-cocoa-nut-mix',
        'name' => 'Dark Cocoa Nut Mix',
        'category' => 'Nut Mix (ถั่วเคลือบดาร์กโกโก้)',
        'origin' => 'อัลมอนด์, เม็ดมะม่วงหิมพานต์, เฮเซลนัท, ผงดาร์กโกโก้พรีเมียม',
        'notes' => 'ดาร์กช็อกโกแลตเข้มสะใจ กรุบกรอบ ไขมันดีจากถั่ว 100%',
        'roast' => 'คั่วอบแห้งไม่ใช้น้ำมัน (Oil-Free Roasted)',
        'aroma' => 'โกโก้ดาร์ก & ถั่วคั่วหอมกรุ่น',
        'body' => '185 kcal / ไขมันดี HDL สูง',
        'caffeine' => 'โปรตีน 5g / แมกนีเซียมและสารต้านอนุมูลอิสระ',
        'brew_methods' => 'ทานเล่นระหว่างทำงาน, ก่อนหรือหลังออกกำลังกาย',
        'price' => 155,
        'image' => 'https://k1ts4k0n.github.io/NIBBLY/products/dark-cocoa.jpg',
        'url' => 'https://k1ts4k0n.github.io/NIBBLY/shop/dark-cocoa-nut-mix/',
        'match_tags' => ['ขม', 'ดาร์กโกโก้', 'ช็อกโกแลต', 'คั่วเข้ม', 'เสริมโปรตีน', 'ถั่ว', 'สมาธิ']
    ],
    [
        'id' => 'honey-almond-crunch',
        'name' => 'Honey Almond Crunch',
        'category' => 'Granola (กราโนล่าผสมน้ำผึ้งแท้)',
        'origin' => 'อัลมอนด์แคลิฟอร์เนีย, น้ำผึ้งดอกไม้ป่า, มะพร้าวอบกรอบ, ข้าวโอ๊ต',
        'notes' => 'หอมหวานละมุนจากน้ำผึ้งแท้ คลัสเตอร์กรอบอร่อยลงตัว',
        'roast' => 'อบแบบโฮมเมด Small-Batch Golden Baked',
        'aroma' => 'น้ำผึ้งป่า & อัลมอนด์คั่วทอง',
        'body' => '180 kcal / พลังงานสะอาด',
        'caffeine' => 'โปรตีน 5g / ไฟเบอร์ 4g',
        'brew_methods' => 'ทานเป็นอาหารเช้า, ทานกับนมหรือผลไม้สด',
        'price' => 139,
        'image' => 'https://k1ts4k0n.github.io/NIBBLY/products/honey.jpg',
        'url' => 'https://k1ts4k0n.github.io/NIBBLY/shop/honey-almond-crunch/',
        'match_tags' => ['หวานกลมกล่อม', 'น้ำผึ้ง', 'ถั่ว', 'อัลมอนด์', 'อาหารเช้า', 'พลังงาน']
    ],
    [
        'id' => 'peanut-butter-protein-bites',
        'name' => 'Peanut Butter Protein Bites',
        'category' => 'Protein Snacks (โปรตีนไบท์)',
        'origin' => 'เนยถั่วลิสงบดหยาบ, โปรตีนถั่วลันเตา, ข้าวโอ๊ต, เมล็ดเจีย',
        'notes' => 'หนึบหนับ หอมเนยถั่วเต็มคำ อยู่ท้องนาน ไม่ใส่น้ำตาล',
        'roast' => 'สกัดเย็นคลีนฟู้ดส์ (Raw Plant Fuel)',
        'aroma' => 'เนยถั่วลิสงคั่วบดแท้',
        'body' => '190 kcal / อยู่ท้อง ลดความอยากอาหารจุกจิก',
        'caffeine' => 'โปรตีนสูง 8g ต่อหน่วยบริโภค',
        'brew_methods' => 'ทานก่อนเข้ายิม, เสริมโปรตีนยามบ่าย',
        'price' => 159,
        'image' => 'https://k1ts4k0n.github.io/NIBBLY/products/protein.jpg',
        'url' => 'https://k1ts4k0n.github.io/NIBBLY/shop/peanut-butter-protein-bites/',
        'match_tags' => ['เสริมโปรตีน', 'เนยถั่ว', 'ออกกำลังกาย', 'ฟิตเนส', 'โปรตีนสูง', 'ถั่ว']
    ],
    [
        'id' => 'green-matcha-oat-bites',
        'name' => 'Green Matcha Oat Bites',
        'category' => 'Energy Bites (มัทฉะโอ๊ตไบท์)',
        'origin' => 'ผงมัทฉะเกรดพิธีการชิซูโอกะ, ข้าวโอ๊ต, อินทผาลัม, อัลมอนด์',
        'notes' => 'รสชาติมัทฉะแท้เข้มข้น กลมกล่อมลงตัว ไม่หวานจัด',
        'roast' => 'คลีนวีแกน 100% (No Dairy / No Sugar)',
        'aroma' => 'ใบชามัทฉะสดจากญี่ปุ่น',
        'body' => '154 kcal / L-Theanine ช่วยให้มีสมาธิ',
        'caffeine' => 'สารต้านอนุมูลอิสระ EGCG สูง',
        'brew_methods' => 'ทานคู่น้ำอุ่นยามเช้า หรือทานช่วงอ่านหนังสือทำงาน',
        'price' => 139,
        'image' => 'https://k1ts4k0n.github.io/NIBBLY/products/matcha.jpg',
        'url' => 'https://k1ts4k0n.github.io/NIBBLY/shop/green-matcha-oat-bites/',
        'match_tags' => ['มัทฉะ', 'ชาเขียว', 'วีแกน', 'สมาธิ', 'บำรุงสมอง', 'คลีน']
    ],
    [
        'id' => 'strawberry-yogurt-bites',
        'name' => 'Strawberry Yogurt Bites',
        'category' => 'Fruit Snacks (ผลไม้อบกรอบโยเกิร์ต)',
        'origin' => 'สตรอว์เบอร์รีแท้ฟรีซดราย, โยเกิร์ตสดแท้, ข้าวพองกรอบ',
        'notes' => 'กรอบฟู เปรี้ยวอมหวานละมุน ละลายในปาก',
        'roast' => 'ฟรีซดรายคงคุณค่าโพรไบโอติกส์ (Freeze-Dried)',
        'aroma' => 'สตรอว์เบอร์รีสด & โยเกิร์ตหอมหวาน',
        'body' => '145 kcal / โพรไบโอติกส์ดีต่อลำไส้',
        'caffeine' => 'วิตามินซีธรรมชาติสูง',
        'brew_methods' => 'ทานเล่นเพลินๆ ขณะดูซีรีส์ หรือทานคู่ผลไม้สด',
        'price' => 129,
        'image' => 'https://k1ts4k0n.github.io/NIBBLY/products/strawberry-yogurt.jpg',
        'url' => 'https://k1ts4k0n.github.io/NIBBLY/shop/strawberry-yogurt-bites/',
        'match_tags' => ['สตรอว์เบอร์รี', 'เปรี้ยวหวาน', 'โยเกิร์ต', 'ผลไม้', 'สุขภาพลำไส้', 'ผิวพรรณสดใส']
    ],
    [
        'id' => 'nibbly-super-snack-mix',
        'name' => 'NIBBLY Super Snack Mix',
        'category' => 'Trail Mix (รวมซูเปอร์ฟู้ดส์ยอดฮิต)',
        'origin' => 'อัลมอนด์, เม็ดมะม่วงหิมพานต์, วอลนัท, บลูเบอร์รี, แครนเบอร์รี, เมล็ดฟักทอง',
        'notes' => 'รวมสารอาหารครบจบในซองเดียว ครบทุกมิติความกรอบมันเปรี้ยวหวาน',
        'roast' => 'Slow-Roasted คั่วอบไฟอ่อนเพื่อถนอมสารอาหาร',
        'aroma' => 'ผลไม้แห้งและถั่วรวม 7 ชนิด',
        'body' => '188 kcal / อิ่มนาน ให้พลังงานยั่งยืน',
        'caffeine' => 'โอเมก้า 3, 6, 9 & ไฟเบอร์สูง 5g',
        'brew_methods' => 'พกติดกระเป๋าทานระหว่างเดินทาง หรือทานเติมพลังงาน',
        'price' => 169,
        'image' => 'https://k1ts4k0n.github.io/NIBBLY/products/super-mix.jpg',
        'url' => 'https://k1ts4k0n.github.io/NIBBLY/shop/nibbly-super-snack-mix/',
        'match_tags' => ['ซูเปอร์มิกซ์', 'ถั่วรวม', 'ผลไม้รวม', 'สุขภาพครบวงจร', 'คุมน้ำหนัก', 'เสริมโปรตีน']
    ]
];

/**
 * ฟังก์ชัน PHP ดึงข้อมูลสินค้าแนะนำของ NIBBLY ตามความชอบหรือเป้าหมายสุขภาพ
 * 
 * @param string $preference ความสนใจ/รสชาติ/เป้าหมาย (เช่น ขม, โกโก้, สตรอว์เบอร์รี, โปรตีน)
 * @param string $extra_scent กลิ่นที่สนใจ (ถ้ามี)
 * @param string $extra_type ประเภทขนม (ถ้ามี)
 * @return array ข้อมูลสินค้า NIBBLY ที่ตรงใจที่สุด
 */
function fetchNibblyRecommendation($preference = 'ช็อกโกแลต', $extra_scent = '', $extra_type = '') {
    global $nibbly_catalog;

    $best_item = $nibbly_catalog[0]; // ค่าเริ่มต้นคือ NIBBLY Berry Granola
    $highest_score = -1;

    $search_terms = array_filter([
        mb_strtolower(trim($preference)),
        mb_strtolower(trim($extra_scent)),
        mb_strtolower(trim($extra_type))
    ]);

    foreach ($nibbly_catalog as $item) {
        $score = 0;

        foreach ($search_terms as $term) {
            if (empty($term)) continue;

            // ตรวจสอบใน Tags
            foreach ($item['match_tags'] as $tag) {
                if (mb_stripos($tag, $term) !== false || mb_stripos($term, $tag) !== false) {
                    $score += 4;
                }
            }

            // ตรวจสอบในชื่อสินค้า
            if (mb_stripos($item['name'], $term) !== false) {
                $score += 3;
            }

            // ตรวจสอบในรสชาติ/ส่วนผสม
            if (mb_stripos($item['notes'], $term) !== false || mb_stripos($item['origin'], $term) !== false) {
                $score += 2;
            }

            // ตรวจสอบในกลิ่น
            if (mb_stripos($item['aroma'], $term) !== false) {
                $score += 2;
            }
        }

        if ($score > $highest_score) {
            $highest_score = $score;
            $best_item = $item;
        }
    }

    return $best_item;
}

/**
 * ฟังก์ชัน PHP ดึงข้อมูลสินค้าแนะนำยอดนิยม 4 รายการของ NIBBLY
 * เพื่อแสดงในการ์ด Email สวยงามครบ 4 ตัวเลือกตามที่ขอ
 */
function fetchTop4NibblyRecommendations($preference = 'เบอร์รี่', $extra_scent = '', $extra_type = '') {
    global $nibbly_catalog;

    $items_with_score = [];
    $search_terms = array_filter([
        mb_strtolower(trim($preference)),
        mb_strtolower(trim($extra_scent)),
        mb_strtolower(trim($extra_type))
    ]);

    foreach ($nibbly_catalog as $item) {
        $score = 0;
        foreach ($search_terms as $term) {
            if (empty($term)) continue;
            foreach ($item['match_tags'] as $tag) {
                if (mb_stripos($tag, $term) !== false || mb_stripos($term, $tag) !== false) {
                    $score += 4;
                }
            }
            if (mb_stripos($item['name'], $term) !== false) $score += 3;
            if (mb_stripos($item['notes'], $term) !== false) $score += 2;
        }
        $items_with_score[] = ['item' => $item, 'score' => $score];
    }

    // เรียงลำดับตามคะแนนความตรงกับความสนใจ
    usort($items_with_score, function ($a, $b) {
        return $b['score'] <=> $a['score'];
    });

    $top4 = [];
    for ($i = 0; $i < min(4, count($items_with_score)); $i++) {
        $top4[] = $items_with_score[$i]['item'];
    }

    return $top4;
}
