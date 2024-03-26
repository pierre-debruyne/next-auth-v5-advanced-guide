import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className='h-full w-full bg-gray-100'>
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
