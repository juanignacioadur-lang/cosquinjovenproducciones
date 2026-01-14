/* src/data/data.js */

export const eventsData = [
  {
    id: "e1",
    title: "COSQUÍN JOVEN AL TEATRO – VILLA CARLOS PAZ",
    shortTitle: "COSQUÍN JOVEN", 
    short: "Un encuentro único en el Teatro Acuario. Danza, arte y turismo.",
    date: "20 al 23 de Febrero de 2026",
    location: "Teatro Acuario, Villa Carlos Paz",
    image: "/COSQUIN JOVEN AL TEATRO.jpg",
    images: ["/COSQUIN JOVEN AL TEATRO.jpg"],
    instagramLink: "https://www.instagram.com/cosquinjoven.producciones/p/DQvBp-6jApW/",
    whatsappLink: "https://wa.me/5493541393487?text=Hola,%20quiero%20más%20información%20sobre%20Cosquín%20Joven%20al%20Teatro%20(Carlos%20Paz).",
    
    longDescription: "Un mega evento cultural que reúne tradición, danza, malambo y folklore. Participan academias, escuelas, ballets, instituciones, artistas y malambistas de todas las edades en el corazón turístico de Villa Carlos Paz.",
    
    fullDetails: [
      { 
        title: "Reglamento de Participación", 
        icon: "📘", 
        text: "Objetivo: Convocar a niños, jóvenes y adultos, promoviendo la amistad y el fortalecimiento de las raíces.",
        list: [
          "Certamen competitivo en Ballet Folklórico y Malambo.",
          "Inscripción abierta hasta el 15 de enero de 2026.",
          "Sonido provisto por la organización (pendrive con música).",
          "Todas las categorías deben presentar danza tradicional en etapa inicial.",
          "Conjuntos y ballets: mínimo 3 parejas, sin máximo.",
          "El fallo del jurado es inapelable."
        ] 
      },
      { 
        title: "Rubros Campeonato (Malambo)", 
        icon: "🔥", 
        text: "Acompañamientos en vivo y con vestuario acorde.",
        list: [
          "Semillita (hasta 9 años): 1-3 min",
          "Menor Masc/Fem (10-13 años): 1-3 min / 2-3 min",
          "Juvenil Masc/Fem (14-17 años): 2-3 min",
          "Juvenil Especial Masc (18-20 años): 2-4 min",
          "Mayor Masc (21-35 años) / Norte-Sur (18+): 2-5 min",
          "Especial (36-42 años) / Senior (43+): 2-4 min"
        ] 
      },
      { 
        title: "Danza y Conjuntos", 
        icon: "💃", 
        subSections: [
          {
            title: "Parejas (Menor a Especial)",
            list: ["Danza tradicional regional.", "Final: Cuadro estilizado folklórico o libre."]
          },
          {
            title: "Conjuntos y Ballets",
            list: ["Mínimo 3 parejas.", "Menores pueden participar en mayores hasta 30%."]
          },
          {
            title: "Malambo Combinado",
            list: ["Unísono Menor, Juvenil y Mayor.", "Se permite mixto.", "Se elige la mejor propuesta."]
          }
        ] 
      },
      { 
        title: "Premios", 
        icon: "🏅", 
        list: [
          "Campeones Argentinos: Certificado + Premio Challenger.",
          "Ranking Nacional: Premios del 1.º al 10.º puesto.",
          "Campeón de Campeones: Quienes defiendan su Challenger.",
          "Campeones serán portada del flyer del año siguiente."
        ] 
      }
    ],

    packs: [
      { 
        title: "RESERVA TU PACK", 
        price: "$50.000", 
        items: [
          "Seña para asegurar tu lugar",
          "Descontable del valor total",
          "Cupos limitados"
        ] 
      },
      { 
        title: "OPCIÓN 1", 
        price: "$75.000 x cuota", 
        items: [
          "1ª cuota: Hasta 15 Dic 2025 (Congela precio)",
          "2ª cuota: Hasta 21 Ene 2026",
          "3ª cuota: Hasta 10 Feb 2026"
        ] 
      }, 
      { 
        title: "OPCIÓN 2", 
        price: "$83.400 x cuota",
        items: [
          "1ª cuota: Hasta 2 Ene 2026",
          "2ª cuota: Hasta 30 Ene 2026",
          "3ª cuota: Hasta 10 Feb 2026"
        ]
      }
    ],

    prizes: [
      { place: "Bonificación", reward: "Cada 10 participantes de una academia → 1 liberado gratuito. (ES BONIFICACIÓN AL PROFE O DELEGADO)" },
      { place: "Delegados", reward: "Comunicación exclusiva con la organización." }
    ],
    reglamentoLink: null,
  },

  {
    id: "e2",
    title: "COSQUÍN JOVEN – CARTAGENA 2026",
    shortTitle: "CARTAGENA 2026", 
    short: "1.ª Edición Internacional en la Perla del Caribe.",
    date: "22 al 26 de Septiembre 2026",
    location: "Cartagena de Indias, Colombia",
    image: "/COSQUIN JOVEN CARTAGENA.jpg",
    images: ["/COSQUIN JOVEN CARTAGENA.jpg"],
    instagramLink: "https://www.instagram.com/cosquinjoven.producciones/p/DROAuSCDN1D/",
    whatsappLink: "https://wa.me/5493541393487?text=Hola,%20quiero%20más%20información%20sobre%20Cosquín%20Joven%20Cartagena%202026.",
    longDescription: "¡Llega la 1.ª Edición Internacional! Un encuentro único donde la danza, el canto y la cultura folklórica se unen en Cartagena de Indias. Participan academias, ballets, con cantantes, peñas, escuelas, centros culturales, jubilados, artistas y viajeros.",
    fullDetails: [
      { 
        title: "Pack Experience (Todo Incluido)", 
        icon: "🛏️", 
        text: "7 días y 6 noches con pensión completa en Hotel El Nuevo Conquistador.", 
        list: [
          "Hospedaje con balcón y vista al mar.",
          "Pensión completa (Desayuno, Almuerzo, Cena + Bebidas).",
          "Remera + gorra oficial, credencial y medalla.",
          "Cursos de capacitación con directores internacionales.",
          "Traslados internos y Seguro médico obligatorio."
        ] 
      },
      { 
        title: "Presentaciones Artísticas", 
        icon: "🎭", 
        subSections: [
          { 
            title: "🎤 Cantantes / Grupos Vocales", 
            list: ["3 presentaciones en total (2 en una gala, 1 en otra).", "Duración máx: 8 minutos c/u."] 
          }, 
          { 
            title: "💃 Ballets / Danza", 
            list: ["4 propuestas distintas obligatorias.", "2 presentaciones por gala.", "Duración máx: 10 minutos c/u."] 
          }
        ] 
      },
      {
        title: "Reglas y Música",
        icon: "🎵",
        list: [
          "Enviar música 20 días antes.",
          "Traer pendrive de respaldo.",
          "Enviar video mensual mostrando progreso de ensayos."
        ]
      }
    ],
    packs: [
      { 
        title: "PLAN 1 (Desde 4 Mar)", 
        price: "Cuotas USD", 
        items: [
          "1ª: USD 200 (45 días tras reserva)", 
          "2ª: USD 200 (1-15 Julio)", 
          "Saldo: USD 200 (hasta 21 Agosto)"
        ] 
      }, 
      { 
        title: "PLAN 2", 
        price: "Cuotas USD", 
        items: [
          "1ª: USD 250 (hasta 15 Mayo)", 
          "2ª: USD 200 (hasta 15 Junio)", 
          "Saldo: USD 250 (hasta 21 Agosto)"
        ] 
      }
    ],
    prizes: [
      { place: "Experiencias", reward: "Playas, Fuerte histórico, Magia colonial." }, 
      { place: "Reserva", reward: "Seña de 600.000 COP para asegurar cupo." }
    ],
    reglamentoLink: null,
  },
  {
    id: "e3",
    title: "EL ARGENTINO 2026",
    shortTitle: "EL ARGENTINO", 
    short: "Un mega evento cultural que reúne tradición y malambo.",
    date: "20 al 23 de Febrero de 2026",
    location: "Teatro Acuario, Villa Carlos Paz",
    image: "/EL ARGENTINO.jpg",
    images: ["/EL ARGENTINO.jpg"],
    instagramLink: "https://www.instagram.com/cosquinjoven.producciones/p/DRQhxujDAGd/",
    whatsappLink: "https://wa.me/5493541393487?text=Hola,%20quiero%20más%20información%20sobre%20El%20Argentino%202026.",
    longDescription: "Un mega evento cultural que reúne tradición, danza, malambo y folklore. Participan academias, escuelas, ballets, instituciones, artistas y malambistas de todas las edades. Promoviendo la amistad y el fortalecimiento de las raíces.",
    fullDetails: [
      { 
        title: "Información General", 
        icon: "📘", 
        list: [
          "Certamen competitivo en Ballet Folklórico y Malambo.",
          "Inscripción abierta hasta el 15 de enero de 2026.",
          "Todas las categorías deben presentar danza tradicional en etapa inicial.",
          "Sonido provisto por la organización (pendrive)."
        ] 
      },
      { 
        title: "Campeonato de Malambo", 
        icon: "🔥", 
        text: "Músicos deben vestir ropa tradicional. Acompañamiento en vivo.",
        list: [
          "Semillita (hasta 9): 1-3 min",
          "Menor Masc/Fem (10-13): 1-3 min / 2-3 min",
          "Juvenil Masc/Fem (14-17): 2-3 min",
          "Juvenil Especial Masc (18-20): 2-4 min",
          "Mayor Masc (21-35) / Norte-Sur (18+): 2-5 min",
          "Especial (36-42) / Senior (43+): 2-4 min"
        ] 
      },
      { 
        title: "Danza y Conjuntos", 
        icon: "💃", 
        subSections: [
          {
            title: "Parejas (Menor a Especial)",
            list: ["Danza tradicional regional.", "Final: Cuadro estilizado o libre."]
          },
          {
            title: "Conjuntos y Ballets",
            list: ["Mínimo 3 parejas.", "Menores pueden participar en mayores hasta 30%."]
          }
        ] 
      },
      { 
        title: "Malambo Combinado", 
        icon: "⚔️", 
        list: ["Unísono Menor, Juvenil y Mayor.", "Se permite mixto.", "Se elige la mejor propuesta."] 
      }
    ],
    packs: [
      { 
        title: "BÁSICO", 
        price: "$30.000", 
        items: ["Inscripción al evento", "Derecho a participación", "Certificado digital"] 
      },
      { 
        title: "PACK RECUERDO", 
        price: "$40.000", 
        items: ["Inscripción al evento", "Remera oficial de El Argentino", "Certificado impreso"] 
      },
      { 
        title: "PACK COMPLETO", 
        price: "$100.000", 
        items: ["Inscripción al evento", "Remera oficial", "Curso de Capacitación exclusivo", "Acceso a sectores preferenciales"] 
      }
    ],
    prizes: [
      { place: "Campeones", reward: "Certificado + Premio Challenger." }, 
      { place: "Ranking", reward: "Premios del 1.º al 10.º puesto." },
      { place: "Bonificación", reward: "Cada 10 participantes de una academia → 1 liberado gratuito. (ES BONIFICACIÓN AL PROFE O DELEGADO)" }
    ],
    reglamentoLink: null,
  },
  {
    id: "e4",
    title: "DANZABUELOS 2026 – Festival + Unión",
    shortTitle: "DANZABUELOS", 
    short: "Un festival de encuentro entre generaciones. Risas, emoción y pasión por el folklore.",
    date: "12 al 15 de Junio de 2026",
    location: "Teatro Acuario, Villa Carlos Paz",
    image: "/DANZA ABUELOS.jpg",
    images: ["/DANZA ABUELOS.jpg"], 
    instagramLink: "https://www.instagram.com/p/DTAtv1-jh93",
    whatsappLink: "https://wa.me/5493541393487?text=Hola,%20quiero%20más%20información%20sobre%20el%20Festival%20Danzabuelos%202026.",
    longDescription: "Danzabuelos es un festival de encuentro entre generaciones. Un espacio de abrazos sinceros, risas compartidas y emoción. Fue creado para cumplir el sueño de los adultos mayores de todo el país, brindándoles un escenario donde expresarse y ser protagonistas.",
    fullDetails: [
      { 
        title: "Quiénes pueden participar", 
        icon: "🌈", 
        text: "De todas las edades, el escenario une generaciones y celebra la vida.",
        list: ["Escuelas y Academias", "Ballets e Instituciones", "Cantantes y Grupos artísticos"] 
      },
      { 
        title: "Presentaciones Artísticas", 
        icon: "🎭", 
        subSections: [
          { title: "🎤 Cantantes y Parejas", list: ["2 presentaciones de 5 minutos cada una."] },
          { title: "💃 Ballets y Grupos", list: ["2 presentaciones de 8 minutos.", "Si son +35 integrantes: 3 presentaciones de 8 min."] }
        ] 
      },
      { 
        title: "Pack Experiencia - Incluye", 
        icon: "🧳", 
        list: [
          "Actuaciones en el Teatro Acuario",
          "Entrada gratuita los 3 días del festival",
          "Hospedaje 4 días / 3 noches + desayunos",
          "Remera oficial del evento",
          "City tour por Villa Carlos Paz",
          "Curso de capacitación con diploma",
          "Recuerdo sorpresa del festival"
        ] 
      },
      { 
        title: "Momento Especial 2026", 
        icon: "👑", 
        text: "Viviremos la reelección de la Abuela y el Abuelo Rey, quienes serán la imagen oficial del festival representando la unión y la emoción."
      }
    ],
    packs: [
      { 
        title: "PREVENTA (6 CUOTAS)", 
        price: "$240.000 total", 
        items: ["1ª cuota: $40.000 (hasta 15/01)", "4ª cuota: $40.000 (hasta 15/04)", "6ª cuota: $40.000 (hasta 05/06)"] 
      },
      { 
        title: "OPCIÓN ALTERNATIVA", 
        price: "$260.000 total", 
        items: ["Plan de 4 cuotas de $65.000", "Cuotas en Marzo, Abril, Mayo y Junio", "Confirmación con el 100% abonado"] 
      }
    ],
    prizes: [
      { place: "Beneficio 10+1", reward: "Si traés 10 personas, tu Pack Experiencia es bonificado al 100%." },
      { place: "Recuerdo", reward: "Cuadro grupal de regalo para cada delegación." },
      { place: "Comisión", reward: "Porcentaje especial para delegados por cada acompañante sumado." }
    ],
    reglamentoLink: null,
  }
];

/* --- NOTICIAS --- */
export const newsData = [
  {
    id: 4,
    title: "DANZABUELOS DÍA 2",
    date: "13 de Diciembre, 2025",
    category: "Danzabuelos 2",
    image: "/danzabuelos1.jpg",
    excerpt: "Un encuentro lleno de emoción, danza y cultura. El intendente anunció que el próximo año el festival volverá a tener sede en nuestra ciudad.",
    whatsappLink: "https://wa.me/5493541393487?text=Hola,%20quiero%20saber%20más%20sobre%20el%20Festival%20Danzabuelos",
    detailImages: ["/danzabuelos1.jpg", "/danzabuelos2.jpg", "/danzabuelos3.jpg"], 
    fullContent: [
      "🩵 Día 2 del Festival DanzAbuelos en Tanti. Un encuentro lleno de emoción, danza y cultura. 💃✨",
      "La productora @cosquinjoven.producciones resaltó el acompañamiento de la Municipalidad de Tanti en la realización de este gran evento, consolidando lazos importantes para nuestra cultura.",
      "El intendente @emiparedestanti anunció que el próximo año el festival volverá a tener sede en nuestra ciudad, reafirmando el compromiso de seguir promoviendo la cultura y el encuentro. 🙌",
      "Agradecemos a la productora y a los organizadores por traer cultura y alegría a nuestra comunidad. 💙"
    ]
  },
  {
    id: 5,
    title: "DANZABUELOS DÍA 1",
    date: "12 de Diciembre, 2025",
    category: "Danzabuelos",
    image: "/tanti1.jpg",
    excerpt: "Así vivimos el GRAN DANZABUELOS 2025. La jornada abrió con un colorido desfile de academias y agrupaciones.",
    whatsappLink: "https://wa.me/5493541393487?text=Hola,%20quiero%20saber%20más%20sobre%20el%20inicio%20de%20Danzabuelos",
    detailImages: ["/tanti1.jpg", "/tanti2.jpg", "/tanti3.jpg"],
    fullContent: [
      "Así vivimos el GRAN DANZABUELOS 2025. 💃🕺 ¡Ya comenzó DanzAbuelos 2025 en Tanti! 🎉",
      "La jornada abrió con un colorido desfile de academias y agrupaciones, tanto locales como de los países visitantes 🇦🇷🇨🇱🇧🇴🇺🇾🇪🇨.",
      "El cierre estuvo a cargo de las agrupaciones gauchas, que desfilaron a caballo dando fin al recorrido por la Avenida San Martín, para luego continuar la celebración en el Anfiteatro Municipal, colmado de público.",
      "📅 La fiesta sigue sábado y domingo, con toda la alegría, el baile y la cultura del Festival Mundial DanzAbuelos, organizado por Cosquín Producciones.",
      "✨ ¡Tanti vive la danza y el folclore!"
    ]
  },
  {
    id: 1,
    title: "COSQUIN JOVEN 2026: INSCRIPCIONES ABIERTAS",
    date: "2026",
    category: "Inscripciones",
    image: "/imagen1.png",
    excerpt: "Ya están abiertas las inscripciones para Cosquin Joven 2026. No te pierdas la oportunidad de participar en el evento folklórico más importante del año.",
    whatsappLink: "https://wa.me/5493541393487",
    detailImages: ["/imagen1.png"], 
    fullContent: [
      "Nos complace anunciar que ya están abiertas las inscripciones para la edición 2026 de Cosquín Joven. Este evento, que reúne a miles de artistas de todo el país, promete ser una celebración inolvidable de nuestra cultura.",
      "Para inscribirte, ponte en contacto con nosotros a través de nuestros canales oficiales o haciendo clic en el botón de abajo. Recuerda que los cupos son limitados y se asignan por orden de llegada.",
      "Prepárate para vivir jornadas de danza, música, compañerismo y aprendizaje en el escenario mayor del folklore argentino."
    ]
  },
  {
    id: 3,
    title: "REINA DEL FOLKLORE: GRACIAS POR PARTICIPAR",
    date: "2026",
    category: "Certamen",
    image: "/folklore1.jpg",
    excerpt: "Es una emoción increíble poder realizar cada año esta convocatoria. Gracias a todas las participantes y a nuestra productora de moda.",
    whatsappLink: "https://wa.me/5493541393487?text=Hola,%20quiero%20saber%20más%20sobre%20las%20Reinas%20del%20Folklore",
    detailImages: ["/folklore1.jpg", "/folklore2.jpg", "/folklore3.jpg"],
    fullContent: [
      "Gracias a todas las participantes por la Reina del Folklore 👸💘. Es una emoción increíble poder realizar cada año esta convocatoria 🌟, donde la belleza se une con nuestra tradición.",
      "¿Te interesa conocer a nuestras reinas? 💝 Contanos en los comentarios. Este certamen busca destacar no solo la imagen, sino el compromiso con nuestra cultura y nuestras raíces.",
      "Gracias también a la mejor productora de moda, @productora.ludmilaperisse, por acompañarnos siempre 👏 y hacer que cada participante brille en el escenario con elegancia y estilo."
    ]
  },
  {
    id: 2,
    title: "RECUERDOS: ABUELA REINA Y ABUELO REY 2025",
    date: "12 de Diciembre, 2025",
    category: "Recuerdos", 
    image: "/noticiaabuela1.jpg",
    excerpt: "Revive la emoción de la elección de la Abuela Reina y el Abuelo Rey junto a la Delegación Centro de Jubilados Caminemos Juntos de San Luis.",
    detailImages: ["/noticiaabuela1.jpg", "/noticiaabuela2.jpg", "/noticiaabuela3.jpg"],
    fullContent: [
      "¡Qué emoción! 🔥 Una noche llena de magia, tradición y alegría se vivió en la segunda edición de Danzabuelos 2025. El escenario se iluminó con la presencia de nuestros mayores.",
      "Queremos destacar especialmente a la Delegación Centro de Jubilados 'Caminemos Juntos' de San Luis, quienes trajeron su calidez y talento. Fue un honor presenciar la elección de la Abuela Reina y el Abuelo Rey 💘👑.",
      "Estos encuentros no solo celebran el arte, sino la vida misma. Gracias a todos los que hicieron posible esta jornada inolvidable. ¡Vamos por más sueños cumplidos en 2026! 🌟"
    ]
  }
];