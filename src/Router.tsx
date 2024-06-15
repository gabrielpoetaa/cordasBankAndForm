import { Routes, Route } from 'react-router-dom'

import { FormPersonal } from './pages/FormPersonal'

import { FormCourses } from './pages/FormCourses';

import { DefaultLayout } from './layouts/DefaultLayout';


export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />} >
        <Route path="/" element={<FormPersonal />} />
        <Route path="/formCourses" element={<FormCourses />} />
      </Route>
    </Routes>
  );
}