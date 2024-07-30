import Dominoes from "@/components/dominoes";

export default function Home() {
  return (
    <>
    <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url('/images/background.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
      <Dominoes/>
    </div>
    </>
  );
}