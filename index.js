function faqExpansion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Cerrar todos los otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle el item actual
            item.classList.toggle('active');
        });
    });
};

class LanguageSelector {
    constructor() {
        this.button = document.getElementById('languageButton');
        this.dropdown = document.getElementById('languageDropdown');
        this.selectedFlag = document.getElementById('selectedFlag');
        this.selectedName = document.getElementById('selectedName');
        this.options = document.querySelectorAll('.language-option');

        this.init();
    }

    init() {
        // Toggle dropdown
        this.button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Handle option selection
        this.options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectLanguage(option);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            this.closeDropdown();
        });

        // Prevent dropdown from closing when clicking inside
        this.dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Keyboard navigation
        this.button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleDropdown();
            }
        });
    }

    toggleDropdown() {
        const isOpen = this.dropdown.classList.contains('show');
        if (isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        this.button.classList.add('active');
        this.dropdown.classList.add('show');
    }

    closeDropdown() {
        this.button.classList.remove('active');
        this.dropdown.classList.remove('show');
    }

    selectLanguage(option) {
        // Remove selected class from all options
        this.options.forEach(opt => opt.classList.remove('selected'));

        // Add selected class to clicked option
        option.classList.add('selected');

        // Update button display
        const flag = option.dataset.flag;
        const name = option.dataset.name;
        const code = option.dataset.code;

        this.selectedFlag.textContent = flag;
        this.selectedName.textContent = name;

        // Close dropdown
        this.closeDropdown();

        // Trigger custom event for language change
        const event = new CustomEvent('languageChanged', {
            detail: { code, name, flag }
        });
        document.dispatchEvent(event);

        console.log(`Language changed to: ${name} (${code})`);
    }
}

function updateLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[lang][key] || key;
    });
    document.documentElement.lang = lang;
}

const translations = {
    es: {
        // ctas
        cta1: "Quiero mi miswak",
        cta2: "Quiero mi miswak",
        cta3: "Quiero mi miswak",


        // hero
        title: "Dientes saludables y limpios libres de estres",
        description: `Miswak, un cepillo de dientes natural para los que cuidan su salud y el medio ambiente.
            Limpieza eficaz, libre de quimicos artificiales y totalmente ecologica.
            Ofrecemos una prueba GRATIS de 14 dias para que recibas tu primer miswak GRATIS ! Subscribete para disfrutar los beneficios de miswaks frescos en tu buzon cada mes`,
        contact: "Contacto",

        // problems
        "problems-title": "La salud de tus dientes es demasiado importante para descuidarla",
        problem1: "Los cepillos de dientes introducen microplasticos en tu cuerpo, con su uso prolongado acumulan bacterias o te lastiman las encias",
        problem2: "La pasta presenta quimicos agresivos como SLS o plomo",
        problem3: "El hilo dental de plastico hace que acumules PFAS que son disruptores endocrinos",
        problem4: "Gastas en productos dentales que contaminan el medio ambiente",
        problem5: "Sabes que deberías mejorar tu higiene bucal pero no tomas acción",

        // benefits
        "benefits-title": "Beneficios del Miswak",
        "benefit1-title": "Limpieza Superior, encias fuertes y menors sensibilidad",
        "benefit1-explanation": "Las fibras del Miswak tienen efecto anticariogenico y antiplaca, combaten gingivitis, hongos y bacterias ofreciendo una limpieza eficiente y completa",
        "benefit2-title": "Dientes naturalmente blancos",
        "benefit2-explanation": "Los minerales naturales ayudan a eliminar manchas y blanquear los dientes no solo sin dañar el esmalte, sino fortaleciendolo",
        "benefit3-title": "Aliento Fresco",
        "benefit3-explanation": "Los aceites esenciales naturales proporcionan un aliento fresco y su uso estimula la produccion de saliva previniendo la sequedad de la boca",
        "benefit4-title": "100% Natural",
        "benefit4-explanation": "Libre de plásticos, químicos y aditivos artificiales. Una alternativa ecologica, biodegradable y respetuosa con el medio ambiente",

        // how it works
        "how-title": "Cómo Funciona",
        "how1-title": "Reserva tu Miswak",
        "how1-description": "Subscribete, tu reserva incluye tu primer miswak gratis directo a tu puerta",
        "how2-title": "Recibe tu producto",
        "how2-description": "Luego, se te contactará para coordinar la entrega de tu miswak gratis",
        "how3-title": "Disfruta",
        "how3-description": "Recibe tu caja de 3 miswaks mensualmente y experimenta sus beneficios naturales con dientes más limpios, encías más saludables y aliento fresco duradero",

        // testimonials
        "testimonials-title": "Lo que dicen nuestros clientes",

        // faqs
        "faqs-title": "Preguntas Frecuentes",
        "faq1-title": "¿Cuando llega mi Miswak gratis?",
        "faq1-answer": "Tu Miswak gratis llega durante el periodo de prueba directo a tu puerta",
        "faq2-title": "¿Cómo se usa el Miswak?",
        "faq2-answer": "Simplemente pele 1-2 cm de la corteza del extremo, mastique ligeramente hasta formar cerdas naturales y cepille sus dientes como lo haría con un cepillo normal. No requiere pasta dental",
        "faq3-title": "¿Cuánto dura cada Miswak?",
        "faq3-answer": "Con un uso adecuado, cada Miswak puede durar alrededor de 2 semanas. Cuando las cerdas se desgastan, simplemente corte ese extremo y prepare uno nuevo",
        "faq4-title": "¿Reemplaza completamente mi cepillo de dientes y pasta ?",
        "faq4-answer": "Sí, el Miswak puede reemplazar por completo su cepillo y pasta de dientes. De hecho, estudios científicos han demostrado que es tan efectivo o más que los cepillos convencionales.",
        "faq5-title": "¿Cómo debo almacenarlo?",
        "faq5-answer": "Para mantener su frescura, guarde el Miswak en un lugar seco y ventilado",

        // product
        "product-title": "Caja de 3 Miswaks/Siwak - Cepillos de Dientes Naturales",
        "product-description": "El miswak es una herramienta natural y efectiva para la higiene bucal, respaldada por evidencia científica que confirma sus propiedades y ha demostrado es comparable o incluso superior a los métodos convencionales de higiene bucal en ciertos aspectos. Sus efectos beneficiosos se deben a una combinación de acciones mecánicas y químicas proporcionadas por sus componentes naturales",
        "product-delivery1": "Envío gratis",
        "product-delivery2": "Producto 100% natural y orgánico sin agregados",
        "product-delivery3": "Pago seguro",
        "product-delivery4": "Recibe entregas mensualmente, cancela en cualquier momento"
    },
    en: {
        // ctas
        cta1: "I want my free miswak",
        cta2: "I want to try for free for 14 days",
        cta3: "I want to try for free for 14 days",

        // hero
        title: "Healthy and stress free teeth",
        description: `Miswak, a natural toothbrush for those who care about their health and the environment.
            Become a member and get your first miswak for free ! Plus a box of 3 miswaks in your mailbox every month`,
        contact: "Contact",

        // problems
        "problems-title": "The health of your teeth is too important to be neglected",
        problem1: "Toothbrushes introduce microplastics into your body, with prolonged use they accumulate bacteria or hurt your gums",
        problem2: "The paste contains aggressive chemicals such as SLS or lead",
        problem3: "Plastic dental floss causes you to accumulate PFAS which are endocrine disruptors",
        problem4: "You spend on dental products that pollute the environment",
        problem5: "You know you should improve your oral hygiene but you don't take action",

        // benefits
        "benefits-title": "Miswak benefits",
        "benefit1-title": "Superior cleanliness, strong gums and less sensitivity",
        "benefit1-explanation": "Miswak fibers have an anti-cariogenic and anti-plaque effect, fighting gingivitis, fungi and bacteria, offering an efficient and complete cleaning",
        "benefit2-title": "Naturally white teeth",
        "benefit2-explanation": "Natural minerals help to remove stains and whiten teeth not only without damaging the enamel, but also by strengthening it",
        "benefit3-title": "Fresh Breath",
        "benefit3-explanation": "Natural essential oils provide fresh breath and their use stimulates saliva production, preventing dry mouth",
        "benefit4-title": "100% Natural",
        "benefit4-explanation": "Free of plastics, chemicals and artificial additives. A green, biodegradable and environmentally friendly alternative",

        // how it works
        "how-title": "How It Works",
        "how1-title": "Reserve your Miswak",
        "how1-description": "Subscribe, your reservation includes your first free miswak direct to your door",
        "how2-title": "Receive your product",
        "how2-description": "You will then be contacted to coordinate the delivery of your free miswak",
        "how3-title": "Enjoy",
        "how3-description": "Receive your box of 3 miswaks monthly and experience their natural benefits with cleaner teeth, healthier gums and long-lasting fresh breath",

        // testimonials
        "testimonials-title": "What our customers say",

        // faqs
        "faqs-title": "Frequently Asked Questions",
        "faq1-title": "When does my free Miswak arrive?",
        "faq1-answer": "Your free Miswak arrives during the trial period directly to your door",
        "faq2-title": "How is Miswak used?",
        "faq2-answer": "Simply peel 1-2 cm of the bark off the end, chew lightly to form natural bristles and brush your teeth as you would with a normal toothbrush. No toothpaste required",
        "faq3-title": "How long does each Miswak last?",
        "faq3-answer": "With proper use, each Miswak can last about 2 weeks. When the bristles wear out, simply cut off that end and prepare a new one",
        "faq4-title": "Does it completely replace my toothbrush and toothpaste ?",
        "faq4-answer": "Yes, Miswak can completely replace your toothbrush and toothpaste. In fact, scientific studies have shown it to be as effective or more effective than conventional toothbrushes",
        "faq5-title": "How should I store it?",
        "faq5-answer": "To maintain its freshness, store the Miswak in a dry and ventilated place",

        // product
        "product-title": "Box of 3 Miswaks/Siwak - Natural Toothbrushes",
        "product-description": "The miswak is a natural and effective tool for oral hygiene, backed by scientific evidence that confirms its properties and has been shown to be comparable or even superior to conventional oral hygiene methods in certain aspects. Its beneficial effects are due to a combination of mechanical and chemical actions provided by its natural components",
        "product-delivery1": "Free shipping",
        "product-delivery2": "100% natural and organic product with no additives",
        "product-delivery3": "Secure payment",
        "product-delivery4": "Receive deliveries monthly, cancel at any time"
    },
};

document.addEventListener('DOMContentLoaded', () => {

    new LanguageSelector();
    faqExpansion();
    updateLanguage("es");

    document.addEventListener('languageChanged', (e) => {
        updateLanguage(e.detail.code);
    });

});

// // Función para observar la visibilidad de las secciones
// const observerOptions = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.15
// };
//
// const observer = new IntersectionObserver((entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('is-visible');
//       // Opcional: Dejar de observar una vez que se ha hecho visible
//       // observer.unobserve(entry.target);
//     }
//   });
// }, observerOptions);
//
// // Observar todas las secciones con la clase 'fade-in-section'
// document.addEventListener('DOMContentLoaded', () => {
//   const sections = document.querySelectorAll('.fade-in-section');
//   sections.forEach(section => {
//     observer.observe(section);
//   });
// });
