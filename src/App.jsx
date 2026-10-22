import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout.jsx";
import Loader from "./components/Loader.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
const Home = lazy(() => import("./pages/Home.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const BlogDetail = lazy(() => import("./pages/BlogDetail.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Admin = lazy(() => import("./admin/Admin.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
export default function App() {
  const location = useLocation();
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </Suspense>
    </Layout>
  );
}