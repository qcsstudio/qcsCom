import NeatGradientCanvas from "@/components/Gradients/NeatGradientCanvas";
export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <NeatGradientCanvas />
      <div className="absolute inset-0 flex items-center justify-center z-10 text-white">
        <h1 className="text-4xl font-bold">Neat Gradient Demo</h1>
      </div>
    </main>
  );
}
