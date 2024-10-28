'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FamilyMember = {
  id: string
  name: string
  relationship: string
}

type FamilyData = {
  father: FamilyMember
  mother: FamilyMember
  self: FamilyMember
  spouse: FamilyMember
  children: FamilyMember[]
}

export function FamilyTree() {
  const [familyData, setFamilyData] = useState<FamilyData>({
    father: { id: '1', name: 'Rahul Sharma', relationship: 'Father' },
    mother: { id: '2', name: 'Geeta Sharma', relationship: 'Mother' },
    self: { id: '3', name: 'Raj Sharma', relationship: 'Self' },
    spouse: { id: '4', name: 'Simran Sharma', relationship: 'Spouse' },
    children: [{ id: '5', name: 'Kunal Sharma', relationship: 'Child' }]
  })

  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null)

  const handleEdit = (member: FamilyMember) => {
    setEditingMember(member)
  }

  const handleSave = (updatedMember: FamilyMember) => {
    setFamilyData(prevData => ({
      ...prevData,
      [updatedMember.relationship.toLowerCase()]: updatedMember,
      children: prevData.children.map(child => 
        child.id === updatedMember.id ? updatedMember : child
      )
    }))
    setEditingMember(null)
  }

  const renderFamilyMember = (member: FamilyMember) => {
    if (editingMember && editingMember.id === member.id) {
      return (
        <div className="flex items-center space-x-2">
          <Input 
            value={editingMember.name}
            onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
          />
          <Button onClick={() => handleSave(editingMember)}>Save</Button>
        </div>
      )
    }
    return (
      <div className="flex justify-between items-center p-2 border rounded mb-2">
        <span>{member.name} ({member.relationship})</span>
        <Button onClick={() => handleEdit(member)}>Edit</Button>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Family Tree</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-lg font-semibold mb-2">Parents</Label>
            {renderFamilyMember(familyData.father)}
            {renderFamilyMember(familyData.mother)}
          </div>
          <div>
            <Label className="text-lg font-semibold mb-2">Self & Spouse</Label>
            {renderFamilyMember(familyData.self)}
            {renderFamilyMember(familyData.spouse)}
          </div>
          <div>
            <Label className="text-lg font-semibold mb-2">Children</Label>
            {familyData.children.map((child) => renderFamilyMember(child))}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => console.log('Family tree accepted')}>Accept Family Tree</Button>
        </div>
      </CardContent>
    </Card>
  )
}