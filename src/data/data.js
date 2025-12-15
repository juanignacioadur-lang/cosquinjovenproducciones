export const eventsData = [
  {
    id: "e1",
    title: "COSQUÍN JOVEN AL TEATRO – VILLA CARLOS PAZ",
    short: "Un encuentro único en el Teatro Acuario. Danza, arte y turismo.",
    date: "20 al 23 de Febrero de 2026",
    location: "Teatro Acuario, Villa Carlos Paz",
    image: "/COSQUIN JOVEN AL TEATRO.jpg",
    images: ["/COSQUIN JOVEN AL TEATRO.jpg"],
    instagramLink: "https://www.instagram.com/cosquinjoven.producciones/p/DQvBp-6jApW/",
    longDescription: "Un encuentro único donde tu ballet o academia vive la magia turística de Villa Carlos Paz: el río, el lago, caminatas, el Reloj Cucú, la temporada teatral y todo el encanto de la ciudad.",
    fullDetails: [
      { title: "Premios", icon: "🏆", text: "Reconocimiento al compromiso.", list: ["Si traés 10 personas → 1 Pack Experiencia GRATIS.", "Si traés 50 personas → Premio de $500.000."] },
      { title: "Categorías", icon: "🎭", list: ["Infantil, Juvenil, Mayor, Adulto.", "Danza Folklórica, Estilizada, Malambo."] }
    ],
    packs: [{ title: "OPCIÓN 1", price: "75.000 x cuota", items: ["1ª cuota: Hasta 15 Dic 2025", "2ª cuota: Hasta 21 Ene 2026"] }, { title: "OPCIÓN 2", price: "$500.000 (al traer 50 pax)" }],
    prizes: [{ place: "Delegados", reward: "Pack Gratis (cada 10 pax)" }],
    reglamentoLink: null,
  },
  {
    id: "e2",
    title: "COSQUÍN JOVEN – CARTAGENA 2026",
    short: "1.ª Edición Internacional en la Perla del Caribe.",
    date: "22 al 26 de Septiembre 2026",
    location: "Cartagena de Indias, Colombia",
    image: "/COSQUIN JOVEN CARTAGENA.jpg",
    images: ["/COSQUIN JOVEN CARTAGENA.jpg"],
    instagramLink: "https://www.instagram.com/cosquinjoven.producciones/p/DROAuSCDN1D/",
    longDescription: "¡Llega la 1.ª Edición Internacional! Un encuentro único donde la danza, el canto y la cultura folklórica se unen en Cartagena de Indias.",
    fullDetails: [
      { title: "Pack Experience", icon: "🛏️", text: "7 días y 6 noches con pensión completa.", list: ["Hospedaje", "Pensión completa", "Remera + gorra", "Credencial y medalla", "Traslados internos"] },
      { title: "Presentaciones", icon: "🎭", subSections: [{ title: "🎤 Grupos Vocales", list: ["3 presentaciones en total"] }, { title: "💃 Ballets", list: ["4 propuestas distintas obligatorias"] }] },
    ],
    packs: [{ title: "PLAN 1", price: "Cuotas USD", items: ["1ª: USD 200", "2ª: USD 200", "Saldo: USD 200"] }],
    prizes: [{ place: "Experiencias", reward: "Playas, Fuerte histórico" }],
    reglamentoLink: null,
  },
  {
    id: "e3",
    title: "EL ARGENTINO 2026",
    short: "Un mega evento cultural que reúne tradición y malambo.",
    date: "20 al 23 de Febrero de 2026",
    location: "Córdoba, Argentina",
    image: "/EL ARGENTINO.jpg",
    images: ["/EL ARGENTINO.jpg"],
    instagramLink: "https://www.instagram.com/cosquinjoven.producciones/p/DRQhxujDAGd/",
    longDescription: "Un mega evento cultural que reúne tradición, danza, malambo y folklore. Participan academias de todas las edades.",
    fullDetails: [
      { title: "Reglamento", icon: "📘", text: "Promoviendo la amistad y raíces.", list: ["Inscripción hasta 15 de enero.", "Certamen competitivo."] },
      { title: "Malambo", icon: "🔥", text: "Músicos con ropa tradicional.", list: ["Categorías desde Semillita a Senior"] }
    ],
    packs: [{ title: "Inscripción", price: "Hasta 15 Ene", items: ["Consultar valores"] }],
    prizes: [{ place: "1.º Puesto", reward: "Título Campeón + Challenger" }],
    reglamentoLink: null,
  },
];

export const newsData = [
  {
    id: 1,
    title: "COSQUIN JOVEN 2026: INSCRIPCIONES ABIERTAS",
    date: "2026",
    category: "Inscripciones",
    image: "/imagen1.png",
    excerpt: "Ya están abiertas las inscripciones para Cosquin Joven 2026. No te pierdas la oportunidad.",
    whatsappLink: "https://wa.me/5493541276887",
    // Para esta noticia, solo usamos la imagen principal en el detalle
    detailImages: ["/imagen1.png"], 
    fullContent: [
      "Nos complace anunciar que ya están abiertas las inscripciones para la edición 2026 de Cosquín Joven. Este evento, que reúne a miles de artistas de todo el país, promete ser una celebración inolvidable de nuestra cultura.",
      "Para inscribirte, ponte en contacto con nosotros a través de nuestros canales oficiales o haciendo clic en el botón de abajo. Recuerda que los cupos son limitados y se asignan por orden de llegada. ¡No te quedes afuera de la fiesta del folklore!",
      "Prepárate para vivir jornadas de danza, música, compañerismo y aprendizaje en el escenario mayor del folklore argentino."
    ]
  },
  {
    id: 2,
    title: "RECUERDOS: ABUELA REINA Y ABUELO REY 2025",
    date: "12 de Diciembre, 2025",
    category: "Danzabuelos",
    image: "/noticiaabuela1.jpg",
    excerpt: "Revive la emoción de la elección de la Abuela Reina y el Abuelo Rey.",
    // Aquí definimos las 3 imágenes específicas
    detailImages: ["/noticiaabuela1.jpg", "/noticiaabuela2.jpg", "/noticiaabuela3.jpg"],
    fullContent: [
      "¡Qué emoción! 🔥 Una noche llena de magia, tradición y alegría se vivió en la segunda edición de Danzabuelos 2025. El escenario se iluminó con la presencia de nuestros mayores, quienes nos demostraron que la pasión por la danza no tiene edad.",
      "Queremos destacar especialmente a la Delegación Centro de Jubilados 'Caminemos Juntos' de San Luis, quienes trajeron su calidez y talento para compartir con todos nosotros. Fue un honor presenciar la elección de la Abuela Reina y el Abuelo Rey 💘👑, un momento que quedará guardado en nuestros corazones.",
      "Estos encuentros no solo celebran el arte, sino la vida misma. Verlos disfrutar, reír y compartir es el motor que nos impulsa a seguir trabajando. Gracias a todos los que hicieron posible esta jornada inolvidable. ¡Vamos por más sueños cumplidos en 2026! 🌟"
    ]
  }
];