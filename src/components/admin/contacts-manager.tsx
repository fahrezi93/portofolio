"use client";

import { useState, useEffect } from "react";
import { supabase, ContactMessage } from "@/lib/supabase";
import { Mail, MailOpen, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ContactsManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages from Supabase. Make sure the 'contacts' table exists.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("contacts")
        .update({ is_read: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, is_read: !currentStatus } : msg
      ));
    } catch (error) {
      console.error("Error updating message:", error);
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setMessages(messages.filter(msg => msg.id !== id));
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-white">Contact Messages</h2>
          <p className="text-gray-400">Manage messages sent through your portfolio contact form.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <Card className="bg-[#151b2b] border-white/5">
            <CardContent className="flex flex-col items-center justify-center h-48 text-gray-400 mt-6">
              <Mail className="h-12 w-12 mb-4 opacity-20" />
              <p>No messages found.</p>
            </CardContent>
          </Card>
        ) : (
          messages.map((msg) => (
            <Card key={msg.id} className={`bg-[#151b2b] border-white/5 transition-colors ${!msg.is_read ? 'border-l-4 border-l-blue-500' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      {msg.name}
                      {!msg.is_read && (
                        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium">New</span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-blue-400 font-medium">
                      <a href={`mailto:${msg.email}`}>{msg.email}</a>
                    </CardDescription>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(msg.created_at)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mt-2 whitespace-pre-wrap">{msg.message}</p>
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(msg.id, msg.is_read)}
                    className="border-white/10 text-white hover:bg-white/5"
                  >
                    {msg.is_read ? (
                      <><Mail className="w-4 h-4 mr-2" /> Mark as Unread</>
                    ) : (
                      <><MailOpen className="w-4 h-4 mr-2" /> Mark as Read</>
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMessage(msg.id)}
                    className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-0"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
