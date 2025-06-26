import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactForm from "./contact-form";

export default function ContactFormWrapper() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <Button
        className="sm:mt-5 max-sm:mx-auto w-[200px] sm:h-[50px] text-xl"
        onClick={() => setIsContactFormOpen(true)}
      >
        Get In Touch
      </Button>
      <ContactForm
        open={isContactFormOpen}
        closeAction={() => setIsContactFormOpen(false)}
      />
    </>
  );
}
