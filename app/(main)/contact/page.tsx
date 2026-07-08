import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="px-4">
      {/* Heading */}
      <div className="flex flex-col items-center mt-10 gap-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>

        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          We're here to help. Feel free to reach out to us anytime.
        </p>
      </div>

      {/* Form Section */}
      <form className="w-full max-w-4xl mx-auto shadow p-6 rounded-lg space-y-4 border mt-10">
        <div className="flex flex-col gap-2">
          <Label className="font-semibold text-sm md:text-base">Email</Label>

          <Input
            type="email"
            placeholder="user@gmail.com"
            className="text-sm md:text-base"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="font-semibold text-sm md:text-base">
            Phone Number
          </Label>

          <Input
            type="tel"
            placeholder="98XXXXXXXX"
            className="text-sm md:text-base"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="font-semibold text-sm md:text-base">Subject</Label>

          <Input
            type="text"
            placeholder="Enter Subject"
            className="text-sm md:text-base"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="font-semibold text-sm md:text-base">
            Message (Optional)
          </Label>

          <Textarea
            placeholder="Describe your inquiry"
            className="h-40 md:h-50 text-sm md:text-base"
          />
        </div>

        <Button
          variant="mycolor"
          className="w-full md:w-auto text-sm md:text-base"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default Contact;
