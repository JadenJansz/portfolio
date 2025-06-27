import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type ContactFormProps = {
  open: boolean;
  closeAction: () => void;
  onCancel?: () => void;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "*name is required",
  }),
  email: z.string().email({
    message: "*email is invalid",
  }),
  message: z
    .string()
    .min(1, {
      message: "*enter a message",
    })
    .max(500),
});

export default function ContactForm({ open, closeAction }: ContactFormProps) {
  const [isSending, setIsSending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSending(true);

    const result = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      setIsSending(false);
      toast.error("Message was not sent");
      return;
    }

    setIsSending(false);
    toast.success("Message sent successfully!");
    closeAction();
  };

  const handleDialogClose = (openState: boolean) => {
    if (!openState) {
      form.reset();
      closeAction();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-4xl">Contact Me</DialogTitle>
          <DialogDescription className="text-gray-500">
            Fill the form below and I'll get back to you as soon as possible
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {isSending ? <Loader className="animate-spin" /> : "Send"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
