import fs from "fs";
import path from "path";
import Link from "next/link";
import { GetStaticProps } from "next";

interface HomePageProps {
  paths: string[];
}

export const getStaticProps: GetStaticProps = async () => {
  const contentDirectory = path.join(process.cwd(), "content");

  const getPaths = (dir: string, basePath: string[] = []): string[] => {
    return fs.readdirSync(dir).flatMap((file) => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        return getPaths(fullPath, [...basePath, file]);
      } else if (file === "index.md") {
        return [`/${basePath.join("/")}`];
      }
      return [];
    });
  };

  const paths = getPaths(contentDirectory);

  return { props: { paths } };
};

const HomePage: React.FC<HomePageProps> = ({ paths }) => {
  return (
    <div className="p-8">
      <h1 className="w-full border-b border-gray-500">
        🌐 ACME Co. available pages
      </h1>
      <div className="bg-gray-900 rounded-2xl p-8 border-2 border-gray-500">
        {paths && paths.length > 0 && (
          <ul>
            {paths.map((route) => (
              <li key={route} className="mb-2">
                <Link href={route}>{route}</Link>
              </li>
            ))}
          </ul>
        )}
        {(!paths || paths.length === 0) && (
          <p className="text-gray-500">No pages available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
