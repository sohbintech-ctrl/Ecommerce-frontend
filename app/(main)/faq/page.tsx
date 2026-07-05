import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faq=()=> {
  return (
    <div className="md:max-w-7xl mx-auto space-y-10">
        <div className="mt-10">
        <h1 className="text-center text-3xl">Common Questions</h1>
        </div>
    <Accordion
      type="single"
      collapsible
      defaultValue="shipping"
      className="flex gap-5 items-center"
    >
      <AccordionItem value="shipping">
        <AccordionTrigger className="text-sm md:text-2xl">What are your shipping options?</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">
          We offer standard (5-7 days), express (2-3 days), and overnight
          shipping. Free shipping on international orders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger className="text-sm md:text-2xl">What is your return policy?</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">
          Returns accepted within 30 days. Items must be unused and in original
          packaging. Refunds processed within 5-7 business days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger className="text-sm md:text-2xl">How can I contact customer support?</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">
          Reach us via email, live chat, or phone. We respond within 24 hours
          during business days.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}

export default faq;