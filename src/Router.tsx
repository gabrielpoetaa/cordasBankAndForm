import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Cadastrar } from './pages/Cadastrar';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {/* The index route will render Cadastrar when at the base path */}
        <Route index element={<Cadastrar />} />
        {/* Uncomment this line when you have the FormCourses component */}
        {/* <Route path="/formCourses" element={<FormCourses />} /> */}
      </Route>
    </Routes>
  );
}
