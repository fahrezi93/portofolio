"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import StarBorder from "./StarBorder";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import emailjs from '@emailjs/browser';
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function ContactSection() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const serviceId = 'fahrezi_email';
    const templateId = 'template_w86l3fj';
    const publicKey = 'KhbqXgjDEduLsAKJW';

    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      message: values.message,
      reply_to: values.email,
      to_name: 'Fahrezi'
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast({
          title: "Pesan Terkirim!",
          description: "Terima kasih telah menghubungi. Saya akan segera membalas pesan Anda.",
          variant: "default"
        });
        form.reset();
      })
      .catch((err) => {
        console.error('FAILED...', err);
        toast({
          title: "Pengiriman Gagal",
          description: "Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.",
          variant: "destructive"
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <section id="contact" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-2xl px-4 md:px-6 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          {t.contact_title}
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          {t.contact_subtitle}
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{t.contact_form_name}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.contact_form_name_placeholder}
                        {...field}
                        className="bg-secondary border-border focus:ring-primary h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{t.contact_form_email}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.contact_form_email_placeholder}
                        {...field}
                        className="bg-secondary border-border focus:ring-primary h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">{t.contact_form_message}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.contact_form_message_placeholder}
                      className="resize-none bg-secondary border-border focus:ring-primary text-base"
                      rows={7}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <StarBorder type="submit" disabled={isSubmitting}>
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? "Mengirim..." : t.contact_form_submit}
              </StarBorder>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
