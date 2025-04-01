import fs from "fs";
import path from "path";
import matter from "gray-matter";
import markdownIt from "markdown-it";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";

interface PageProps {
  content: string;
  metadata: { [key: string]: string | number | boolean | null };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contentDirectory = path.join(process.cwd(), "content");

  const getPaths = (
    dir: string,
    basePath: string[] = []
  ): { params: { slug: string[] } }[] => {
    return fs.readdirSync(dir).flatMap((file) => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        return getPaths(fullPath, [...basePath, file]);
      } else if (file === "index.md") {
        return [{ params: { slug: basePath } }];
      }
      return [];
    });
  };

  const paths = getPaths(contentDirectory);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }

  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];

  const filePath = path.join(
    process.cwd(),
    "content",
    ...slugArray,
    "index.md"
  );

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  const md = new markdownIt();
  const htmlContent = md.render(content);

  return { props: { content: htmlContent, metadata: data } };
};

const Page: React.FC<PageProps> = ({ content }) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
};

export default Page;
