import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="flex items-center p-4">
        <Image 
src="/logo.svg"
          alt="AlignSynch Logo" 
          width={100} 
          height={100} 
        />
        <h1 className="ml-4 text-3xl font-bold">
alignsynch.com – Improve Your Important Relationships s
        </h1>
      </header>
      <main className="p-4">
        <p>
          alignsynch.com – Improve Your Important Relationships
        </p>
      </main>
    </div>
  );
}
