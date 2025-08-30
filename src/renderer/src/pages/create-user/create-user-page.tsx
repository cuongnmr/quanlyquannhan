import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { useRef, useState } from 'react'
import FamilyForm from './family-form'
import PersonalForm from './personal-form'
import { User } from '@renderer/types/user'

const CreateUserPage = () => {
  const [data, setData] = useState<User | null>(null)
  const [tabIndex, setTabIndex] = useState<string>('personal')
  const div = useRef<HTMLDivElement>(null)

  function scrollTop() {
    div.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div ref={div} className="-translate-y-4"></div>
      <Tabs value={tabIndex} onValueChange={setTabIndex}>
        <TabsList className="mb-3 w-full">
          <TabsTrigger value="personal">BẢN THÂN</TabsTrigger>
          <TabsTrigger value="family" disabled={Boolean(!data || data.id)}>
            GIA ĐÌNH
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <PersonalForm
            onFinish={(values) => {
              setData(values)
              setTabIndex('family')
              scrollTop()
            }}
            defaultData={data}
          />
        </TabsContent>
        <TabsContent value="family">
          <FamilyForm
            onReturn={() => {
              setTabIndex('personal')
              scrollTop()
            }}
            userId={data?.id}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default CreateUserPage
