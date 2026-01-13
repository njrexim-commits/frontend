import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What products does NJR Exim export?",
    answer: "We export a wide range of agricultural and food products including premium rice, fresh fruits and vegetables, spices, frozen items, confectionery, flour, salt, and specialty items like Makhana (fox nuts). All our products meet international quality standards.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including Letter of Credit (L/C), Telegraphic Transfer (T/T), and other secure international payment options. Payment terms are discussed and agreed upon based on the order size and client relationship.",
  },
  {
    question: "How is product quality ensured?",
    answer: "We implement strict quality control measures at every stage - from sourcing to packaging. All products undergo laboratory testing, and we hold certifications including FSSAI and IEC. We work only with verified suppliers who meet our quality standards.",
  },
  {
    question: "Do you handle customs documentation?",
    answer: "Yes, we provide comprehensive documentation support including commercial invoices, packing lists, certificates of origin, phytosanitary certificates, and all other documents required for smooth customs clearance at the destination.",
  },
  {
    question: "Which countries do you export to?",
    answer: "We export to over 10 countries across the Middle East, Europe, Southeast Asia, Africa, and beyond. Our logistics network enables us to deliver to virtually any international destination with reliable shipping partners.",
  },
  {
    question: "What is the delivery timeline?",
    answer: "Delivery timelines vary based on the destination and shipping method. Typically, sea freight takes 15-45 days depending on the destination, while air freight is available for urgent orders. We provide estimated delivery dates upon order confirmation.",
  },
  {
    question: "Do you offer custom packaging?",
    answer: "Yes, we offer flexible packaging solutions including private labeling and custom packaging options. We can accommodate specific packaging requirements based on your market needs and brand guidelines.",
  },
];

const FAQSection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Info */}
          <div>
            <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Find answers to common questions about our export services, products, 
              and processes. If you have additional questions, feel free to contact us.
            </p>
            <div className="relative rounded-2xl overflow-hidden h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
                alt="Business meeting and consultation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="font-semibold">Need more information?</p>
                  <p className="text-sm opacity-90">Contact our team for personalized assistance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-background rounded-lg px-6 border-0 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
