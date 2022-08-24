export default function HeroBanner() {
  return (
    <div className="w-screen text-center p-8">
      <div className="text-6xl pt-12">Fintech Society</div>
      <a
        href="https://fintechsociety.comp.nus.edu.sg/"
        target={'_blank'}
        rel="noopener"
      >
        <button className="text-base bg-black rounded-md font-semibold text-white pt-2.5 pb-2.5 pl-5 pr-5 mt-16 hover:bg-gray-600 transition-all">
          Click here
        </button>
      </a>
    </div>
  );
}
