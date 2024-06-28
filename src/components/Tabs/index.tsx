import * as Tabs from '@radix-ui/react-tabs'
import { TabItem } from './TabItem'
import { useState } from 'react'
import FormPersonal from '../../pages/FormPersonal'
import FormCourses from '../../pages/FormCourses'

export function TabsRadix() {

  const [currentTab, setCurrentTab] = useState('tab1')

  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
      <Tabs.List className="mt-6 flex w-full items-center gap-4 border-b border-zinc-200">
        <TabItem value="tab1" title="Informacoes Pessoais" isSelected={currentTab == 'tab1'} />
        <TabItem value="tab2" title="Cursos escolhidos" isSelected={currentTab == 'tab2'} />
      </Tabs.List>
      <Tabs.Content value="tab1">
        <FormPersonal />
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <FormCourses />
      </Tabs.Content>
    </Tabs.Root>
  )
}