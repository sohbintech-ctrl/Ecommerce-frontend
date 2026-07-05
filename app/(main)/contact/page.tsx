import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


const Contact=()=>{
    return(
    <div>
        <div className="flex flex-col items-center mt-10 gap-2">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground">We're here to help. Feel free to reach out to us anytime.</p>
        </div>
       
       {/* Form Section */}
  <form
    className="w-full max-w-4xl mx-auto shadow p-6 rounded-lg space-y-4 border mt-10"
  >

    <div className="flex flex-col gap-2">
      <Label className="font-semibold">Email</Label>
      <Input type="email" placeholder="user@gmail.com" required/>
    </div>

    <div className="flex flex-col gap-2">
      <Label className="font-semibold">Phone Number</Label>
      <Input type="number" placeholder="98XXXXXXXX" required/>
    </div>

    <div className="flex flex-col gap-2">
      <Label className="font-semibold">Subject</Label>
      <Input type="number" placeholder="Enter Subject"/>
    </div>

    
    <div className="flex flex-col gap-2">
      <Label className="font-semibold">Message (optional)</Label>
      <Textarea placeholder="Describe your inquiry" className="h-50"/>
    </div>

    <Button variant="mycolor" className="w-full md:w-auto">
     Send Message
    </Button>
  </form>

</div>
    )
}
export default Contact;