'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUser } from "@/app/actions/user-actions"

type MaritalStatus = 'Single' | 'Married' | 'Partner'

export function OnboardingSignup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "kamalika",
    mobileNumber: "8056277749",
    email: "kamalikapoddar@gmail.com",
    pan: "ABCPD1234E",
    aadhaar: "123412341234",
    classXRollNo: "12345",
    maritalStatus: "Married" as MaritalStatus,
    children: "1",
    marriageCertificateNumber: "112233"
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create user in the database
    const result = await createUser(formData)
    
    if (result.success) {
      // Store user ID in localStorage (for demonstration purposes)
      localStorage.setItem('userId', result.userId)
      localStorage.setItem('userStatus', 'new')
      
      // Redirect to LandingPage after successful submission
      router.push('/landing')
    } else {
      // Handle error (you might want to show an error message to the user)
      console.error('Failed to create user:', result.error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Please fill in your details to create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              pattern="[0-9]{10}"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email ID</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pan">PAN</Label>
            <Input
              id="pan"
              name="pan"
              value={formData.pan}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aadhaar">Aadhaar</Label>
            <Input
              id="aadhaar"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="classXRollNo">Class X Roll No</Label>
            <Input
              id="classXRollNo"
              name="classXRollNo"
              value={formData.classXRollNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Select name="maritalStatus" onValueChange={(value) => handleSelectChange("maritalStatus", value)} defaultValue={formData.maritalStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Partner">Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.maritalStatus === 'Married' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="children">Children</Label>
                <Select name="children" onValueChange={(value) => handleSelectChange("children", value)} defaultValue={formData.children}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of children" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value=">2">More than 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="marriageCertificateNumber">Marriage Certificate Number (Optional)</Label>
                <Input
                  id="marriageCertificateNumber"
                  name="marriageCertificateNumber"
                  value={formData.marriageCertificateNumber}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  )
}