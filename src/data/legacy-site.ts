import type { EventRecord, QuoteRecord, SiteSettingsRecord } from '@/lib/types'

export const legacySiteSettings: SiteSettingsRecord = {
  siteName: 'Bhaktipath',
  tagline: 'Where devotion becomes a living path',
  description:
    'The official channel of Pujya Acharya Indresh Upadhyay Ji, sharing Shrimad Bhagwat Katha, devotional bhajans, spiritual teachings, and live events.',
  phones: ['7060103330', '7060113330'],
  social: {
    youtube: 'https://www.youtube.com/@BhaktiPath',
    facebook: 'https://www.facebook.com/indreshjiofficial',
    instagram: 'https://www.instagram.com/bhaktipath/',
  },
}

export const legacyEvents: EventRecord[] = [
  {
    id: 'legacy-6',
    legacyId: '6',
    title: 'Shri Bhakt Maal Katha',
    slug: 'shri-bhakt-maal-katha-jaipur-2025',
    summary: 'A seven-day gathering of katha, devotional atmosphere, and community in Jaipur.',
    description:
      'Shri Bhakt Maal Katha brought devotees together in Jaipur for seven days of Shrimad Bhagwat Katha, bhajans, and communal worship. This event is preserved in the Bhaktipath archive.',
    startDate: '2025-08-19',
    endDate: '2025-08-25',
    timeLabel: '7:30 AM onwards',
    venue: 'Braj Villa, D-70, Sardar Patel Marg, C-Scheme',
    city: 'Jaipur, Rajasthan',
    status: 'completed',
    image: '/images/events/jaipur-2025.jpg',
    imageAlt: 'Shri Bhakt Maal Katha event flyer for Jaipur',
    contactNumbers: ['7060103330', '7060113330'],
    featured: true,
  },
  {
    id: 'legacy-5',
    legacyId: '5',
    title: 'Bhakt Vatsal Gopal',
    slug: 'bhakt-vatsal-gopal-amritsar',
    summary: 'A devotional gathering centred on childlike love for Shri Gopal.',
    description:
      'Bhakt Vatsal Gopal was held at Gauri Shankar Temple, Majitha Road Bypass, Amritsar. Devotees gathered for katha, aarti, and devotional service.',
    startDate: '2025-03-23',
    venue: 'Gauri Shankar Temple, Majitha Road Bypass',
    city: 'Amritsar, Punjab',
    status: 'completed',
    image: '/images/events/bhakt-vatsal-gopal.jpg',
    imageAlt: 'Bhakt Vatsal Gopal event artwork',
    contactNumbers: ['7060103330', '7060113330'],
    featured: true,
  },
  {
    id: 'legacy-4',
    legacyId: '4',
    title: 'Shrimad Bhagwat Katha',
    slug: 'shrimad-bhagwat-katha-vrindavan-2024',
    summary: 'Seven evenings of Shrimad Bhagwat Katha in Vrindavan.',
    description:
      'Pujya Shri Thakur Ji Maharaj shared Shrimad Bhagwat Katha in Vrindavan from 5 to 11 November 2024 at the foothills of Fatehpur Sikri.',
    startDate: '2024-11-05',
    endDate: '2024-11-11',
    timeLabel: '2:00 PM to 5:00 PM',
    venue: 'Bhaktipath camp, Vrindavan',
    city: 'Vrindavan, Uttar Pradesh',
    status: 'completed',
    image: '/images/events/vrindavan-2024.jpg',
    imageAlt: 'Shrimad Bhagwat Katha Vrindavan 2024 flyer',
    contactNumbers: ['7060103330', '7060113330'],
    featured: true,
  },
  {
    id: 'legacy-2',
    legacyId: '2',
    title: 'Shri Girdhar Laal Ji Pancham Utsav',
    slug: 'girdhar-laal-pancham-utsav-gujarat',
    summary: 'A sacred celebration of Shri Girdhar Laal Ji in Gujarat.',
    description:
      'The Pancham Utsav at Shri Dwarika Dham celebrated Shri Girdhar Laal Ji through katha, aarti, and community service.',
    startDate: '2024-01-17',
    venue: 'Shri Dwarika Dham',
    city: 'Gujarat',
    status: 'completed',
    image: '/images/events/dwarka-pancham-utsav.jpg',
    imageAlt: 'Shri Girdhar Laal Ji Pancham Utsav flyer',
    contactNumbers: ['7060103330', '7060113330'],
    featured: false,
  },
  {
    id: 'legacy-1',
    legacyId: '1',
    title: 'Shrimad Bhagwat',
    slug: 'shrimad-bhagwat-carritos-2023',
    summary: 'Pujya Shri Krishna Chandra Shastri Ji shared Shrimad Bhagwat in California.',
    description:
      'An eight-day Shrimad Bhagwat program was held in Carritos, California, from 19 to 26 August 2023 under the guidance of Pujya Shri Krishna Chandra Shastri Ji.',
    startDate: '2023-08-19',
    endDate: '2023-08-26',
    timeLabel: '5:00 PM to 8:00 PM',
    venue: '17808 Stowers Avenue',
    city: 'Carritos, California',
    region: 'United States',
    status: 'completed',
    image: '/images/events/carritos-2023.jpg',
    imageAlt: 'Shrimad Bhagwat Carritos 2023 event flyer',
    contactNumbers: ['+1 310-796-6698', '7060103330', '7060113330'],
    featured: true,
  },
]

export const legacyQuotes: QuoteRecord[] = [
  {
    id: 'quote-1',
    text: 'वास्तव में इंसान ठाकुर जी के व्याकुल हो ऐसा नहीं हो सकता। ठाकुर जी व्याकुल होते हैं तब वह इंसान व्याकुल होता है; अन्यथा इंसान में सामर्थ्य नहीं है।',
    translation:
      'A human being is never truly distressed by the Lord. When the Lord is distressed, the human being is distressed; otherwise, the human being has no strength.',
    attribution: 'Shri Indresh Ji',
  },
  {
    id: 'quote-2',
    text: 'भजन प्रदर्शन का विषय नहीं है। प्रदर्शन में हरी का दर्शन सम्भव नहीं है। अगर हरि दर्शन करना हो तो भजन का प्रदर्शन न करें।',
    translation:
      'Bhajana is not a performance. The divine cannot be seen through display. If you wish to see Hari, do not turn bhajana into a performance.',
    attribution: 'Shri Indresh Ji',
  },
  {
    id: 'quote-3',
    text: 'क्षमा करने वाला सबसे बड़ा होता है। क्षमा दान बहुत बड़ा दान है।',
    translation:
      'The one who forgives is the greatest. The gift of forgiveness is a very great gift.',
    attribution: 'Shri Indresh Ji',
  },
]

export const aboutContent = {
  eyebrow: 'Pujya Acharya Indresh Upadhyay Ji',
  title: 'Teaching love, humility, and the living tradition of bhakti.',
  paragraphs: [
    'Shri Indresh Upadhyay Ji, son of Pujya Shri Krishna Chandra Shastri Ji, is a spiritual teacher and philosopher whose teachings have helped people around the world experience a deeper connection with devotional life.',
    'Bhaktipath is devoted to sharing the wisdom of Shrimad Bhagwat Katha and the living traditions of Hindu spirituality. Through katha, bhajana, teachings, and service, the organization offers a source of understanding, clarity, and light.',
    'This website brings those teachings into one accessible home: listen to bhajans, watch katha, discover past gatherings, and register your interest in future events.',
  ],
}
