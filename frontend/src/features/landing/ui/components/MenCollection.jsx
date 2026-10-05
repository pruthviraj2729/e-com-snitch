
import { useEffect, useState } from "react";
import { Heart, SlidersHorizontal } from "lucide-react";

const MenCollection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenProducts = async () => {
            try {
                const response = await fetch(
                    "/api/products/category?category=Men"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch products");
                }

                setProducts(data.products || []);
            } catch (error) {
                console.error("Failed to fetch men's products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenProducts();
    }, []);

    return (
        <main className="min-h-screen bg-[#f8f7f4] text-[#171717]">

            {/* Hero */}
            <section className="px-5 pt-16 pb-12 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">

                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
                        The Men's Collection
                    </p>

                    <h1 className="max-w-3xl text-5xl font-light tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                        Made for him.
                    </h1>

                    <p className="mt-6 max-w-xl text-sm leading-6 text-neutral-500">
                        Everyday essentials, elevated. Explore our collection
                        of contemporary pieces designed for effortless style.
                    </p>

                </div>
            </section>

            {/* Category bar */}
            <section className="border-y border-neutral-200">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">

                    <div className="flex gap-6 overflow-x-auto text-sm whitespace-nowrap">
                        <button className="font-medium">
                            All
                        </button>

                        <button className="text-neutral-500 transition hover:text-black">
                            T-Shirts
                        </button>

                        <button className="text-neutral-500 transition hover:text-black">
                            Shirts
                        </button>

                        <button className="text-neutral-500 transition hover:text-black">
                            Trousers
                        </button>

                        <button className="text-neutral-500 transition hover:text-black">
                            Outerwear
                        </button>
                    </div>

                    <button className="ml-6 flex shrink-0 items-center gap-2 text-sm">
                        <SlidersHorizontal size={16} strokeWidth={1.5} />
                        <span className="hidden sm:inline">
                            Filter
                        </span>
                    </button>

                </div>
            </section>

            {/* Products */}
            <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">

                <div className="mb-7 flex items-center justify-between">
                    <p className="text-sm text-neutral-500">
                        {loading
                            ? "Loading..."
                            : `${products.length} products`}
                    </p>

                    <button className="text-sm text-neutral-600">
                        Sort: <span className="text-black">Featured</span>
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <div key={item}>
                                <div className="aspect-[3/4] animate-pulse bg-neutral-200" />

                                <div className="mt-4 h-4 w-3/4 animate-pulse bg-neutral-200" />

                                <div className="mt-2 h-3 w-1/3 animate-pulse bg-neutral-200" />
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-xl font-medium">
                                No products found
                            </h2>

                            <p className="mt-2 text-sm text-neutral-500">
                                Check back soon for new arrivals.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">

                        {products.map((product) => (
                            <article
                                key={product._id}
                                className="group cursor-pointer"
                            >

                                {/* Image */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">

                                    <img
                                        src={product.images?.[0]}
                                        alt={product.title}
                                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                                    />

                                    {/* Wishlist */}
                                    <button
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition hover:bg-white"
                                    >
                                        <Heart
                                            size={17}
                                            strokeWidth={1.5}
                                        />
                                    </button>

                                    {/* Hover action */}
                                    <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <button className="w-full bg-black py-3 text-xs font-medium uppercase tracking-[0.15em] text-white">
                                            View Product
                                        </button>
                                    </div>

                                </div>

                                {/* Details */}
                                <div className="pt-4">

                                    <div className="flex items-start justify-between gap-3">

                                        <div>
                                            <h2 className="text-sm font-medium">
                                                {product.title}
                                            </h2>

                                            <p className="mt-1 text-xs text-neutral-500">
                                                {product.type}
                                            </p>
                                        </div>

                                        <p className="shrink-0 text-sm font-medium">
                                            ₹{Number(
                                                product.price?.amount || 0
                                            ).toLocaleString("en-IN")}
                                        </p>

                                    </div>

                                </div>

                            </article>
                        ))}

                    </div>
                )}

            </section>
        </main>
    );
};

export default MenCollection;
