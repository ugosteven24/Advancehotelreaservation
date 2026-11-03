// Image pool used for coverImage and the 7 random galleryImages per destination.
// Replace or extend these with your own photos (any URL works). Keep at least 8.
const UNSPLASH = [
  "photo-1511818966892-d7d671e672a2", "photo-1480714378408-67cf0d13bc1b",
  "photo-1449824913935-59a10b8d2000", "photo-1477959858617-67f85cf4f1df",
  "photo-1507525428034-b723cf961d3e", "photo-1473116763249-2faaef81ccda",
  "photo-1519046904884-53103b34b206", "photo-1475924156734-496f6cac6ec1",
  "photo-1469474968028-56623f02e42e", "photo-1500530855697-b586d89ba3ee",
  "photo-1472214103451-9374bd1c798e", "photo-1441974231531-c6227db76b6e",
  "photo-1470071459604-3b5ec3a7fe05", "photo-1501785888041-af3ef285b470",
  "photo-1506905925346-21bda4d32df4", "photo-1464822759023-fed622ff2c3b",
  "photo-1493246507139-91e8fad9978e", "photo-1514282401047-d79a71a590e8",
  "photo-1505118380757-91f5f5632de0", "photo-1519681393784-d120267933ba",
];
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

// [state, city, popular area 1, popular area 2, attraction, category, region (S = south, N = north)]
const ROWS = [
  ["Abia", "Umuahia", "Ibeku", "Ubakala", "National War Museum", "Museum", "S"],
  ["Adamawa", "Yola", "Jimeta", "Karewa", "Lamido of Adamawa's Palace", "Historic Site", "N"],
  ["Akwa Ibom", "Uyo", "Ewet Housing Estate", "Aka Road", "Ibom Tropicana Entertainment Centre", "Entertainment", "S"],
  ["Anambra", "Awka", "Amawbia", "Ifite", "Agulu Lake", "Nature", "S"],
  ["Bauchi", "Bauchi", "Yelwa", "GRA", "Yankari Game Reserve", "Wildlife", "N"],
  ["Bayelsa", "Yenagoa", "Amarata", "Opolo", "Ox-Bow Lake", "Nature", "S"],
  ["Benue", "Makurdi", "High Level", "North Bank", "River Benue Waterfront", "Nature", "N"],
  ["Borno", "Maiduguri", "Bulumkutu", "Gwange", "Shehu of Borno's Palace", "Historic Site", "N"],
  ["Cross River", "Calabar", "Calabar South", "Diamond Hill", "Calabar Museum", "Museum", "S"],
  ["Delta", "Asaba", "Okpanam Road", "Cable Point", "Niger Bridge Waterfront", "Landmark", "S"],
  ["Ebonyi", "Abakaliki", "Azugwu", "Abakaliki Central", "Uburu Salt Lake", "Nature", "S"],
  ["Edo", "Benin City", "GRA Benin City", "Ikpoba Hill", "Benin National Museum", "Museum", "S"],
  ["Ekiti", "Ado-Ekiti", "Okesa", "Ajilosun", "Ikogosi Warm Springs", "Nature", "S"],
  ["Enugu", "Enugu", "Independence Layout", "Trans-Ekulu", "Nike Lake Resort", "Resort", "S"],
  ["Gombe", "Gombe", "Pantami", "Tudun Wada", "Dadin Kowa Dam", "Nature", "N"],
  ["Imo", "Owerri", "New Owerri", "Aladinma", "Oguta Lake", "Nature", "S"],
  ["Jigawa", "Dutse", "Dutse Old City", "Dutse GRA", "Birnin Kudu Rock Paintings", "Cultural Site", "N"],
  ["Kaduna", "Kaduna", "Barnawa", "Ungwan Rimi", "Kajuru Castle", "Historic Site", "N"],
  ["Kano", "Kano", "Nasarawa GRA", "Sabon Gari", "Gidan Makama Museum", "Museum", "N"],
  ["Katsina", "Katsina", "Kofar Marusa", "Kofar Durbi", "Gobarau Minaret", "Historic Site", "N"],
  ["Kebbi", "Birnin Kebbi", "Gwadangaji", "Kalgo", "Argungu Fishing Festival Grounds", "Festival", "N"],
  ["Kogi", "Lokoja", "Adankolo", "Felele", "Mount Patti", "Nature", "S"],
  ["Kwara", "Ilorin", "Tanke", "Fate", "Owu Waterfall", "Nature", "S"],
  ["Lagos", "Lagos", "Victoria Island", "Lekki", "Lekki Conservation Centre", "Wildlife", "S"],
  ["Nasarawa", "Lafia", "Lafia GRA", "New Market Area", "Farin Ruwa Waterfall", "Nature", "N"],
  ["Niger", "Minna", "Bosso", "Tunga", "Gurara Waterfalls", "Nature", "N"],
  ["Ogun", "Abeokuta", "Kuto", "Ibara", "Olumo Rock", "Nature", "S"],
  ["Ondo", "Akure", "Alagbaka", "Oba-Ile", "Idanre Hills", "Nature", "S"],
  ["Osun", "Osogbo", "Oke-Baale", "Olaiya", "Osun-Osogbo Sacred Grove", "Heritage Site", "S"],
  ["Oyo", "Ibadan", "Bodija", "Jericho", "Agodi Gardens", "Park", "S"],
  ["Plateau", "Jos", "Rayfield", "Bukuru", "Jos Wildlife Park", "Wildlife", "N"],
  ["Rivers", "Port Harcourt", "GRA Phase 2", "Trans Amadi", "Port Harcourt Tourist Beach", "Beach", "S"],
  ["Sokoto", "Sokoto", "Runjin Sambo", "Mabera", "Sultan Bello Mosque", "Historic Site", "N"],
  ["Taraba", "Jalingo", "Magami", "Mayo Gwoi", "Gashaka Gumti National Park", "Wildlife", "N"],
  ["Yobe", "Damaturu", "Nayinawa", "Sunnuma", "Dagona Waterfowl Sanctuary", "Wildlife", "N"],
  ["Zamfara", "Gusau", "Tudun Wada", "Sabon Gari", "Emir of Gusau's Palace", "Historic Site", "N"],
];

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Fisher-Yates shuffle, then take n unique items
function pick(list, n) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

export function buildDestinations() {
  if (ROWS.length !== 36) throw new Error(`Expected 36 states, found ${ROWS.length}`);

  return ROWS.map(([state, city, areaA, areaB, attraction, category, region]) => {
    const isLagos = city === "Lagos";
    const bestTime = region === "N" ? "October to February" : "November to March";
    const [cover, ...gallery] = pick(UNSPLASH, 8); // 1 cover + 7 gallery, all different

    return {
      name: city,
      slug: `${slugify(city)}`,
      country: "Nigeria",
      state,
      city,
      description: isLagos
        ? "Explore Lagos, Nigeria's vibrant commercial capital known for its beaches, nightlife, markets and creative scene."
        : `Explore ${city}, a vibrant destination in ${state} State known for its culture, hospitality and attractions such as ${attraction}.`,
      overview: isLagos
        ? "Lagos is Nigeria's largest city and a major economic hub on the Atlantic coast."
        : `${city} is the capital of ${state} State and an important centre for business, culture and travel in Nigeria.`,
      coverImage: img(cover),
      galleryImages: gallery.map(img), // 7 random images
      bestTimeToVisit: bestTime,
      currency: "Nigerian Naira (NGN)",
      language: region === "N" ? ["English", "Hausa"] : ["English", "Nigerian Pidgin"],
      timezone: "Africa/Lagos",
      popularAreas: [
        { name: areaA, description: `A popular area for stays, dining and local experiences in ${city}.`, image: "" },
        { name: areaB, description: `A well-known neighbourhood with shops, restaurants and easy access around ${city}.`, image: "" },
      ],
      attractions: [
        { name: attraction, category, description: `One of the best-known places to visit in and around ${city}.`, image: "", address: `${city}, ${state} State` },
      ],
      travelTips: [
        { title: "Transportation", description: "Consider using trusted local transportation services." },
        { title: "Accommodation", description: "Book your accommodation in advance, particularly during busy periods." },
        { title: "Planning", description: "Check local travel advisories and plan your routes before you set out." },
      ],
      faqs: [
        {
          question: `What is the capital of ${state} State?`,
          answer: isLagos ? "Ikeja is the state capital, while Lagos is the largest city." : `${city}.`,
        },
        { question: "What currency is used?", answer: "The Nigerian Naira (NGN)." },
        { question: `When is the best time to visit ${city}?`, answer: `${bestTime}.` },
      ],
      featured: ["Lagos", "Rivers", "Cross River", "Enugu", "Oyo", "Kano"].includes(state),
      status: "published",
    };
  });
}