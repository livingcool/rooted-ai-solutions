import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import Products from "@/components/Products";

const ProductsPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
            <Seo
                title="Our AI Products | RootedAI - Enterprise Solutions"
                description="Discover RootedAI's flagship AI products like RhizoConnect, designed to streamline your operations and ticketing processes."
                canonical="https://www.rootedai.co.in/products"
            />
            <Navigation />
            <main className="pt-20">
                <Products />
            </main>
            <Footer />
        </div>
    );
};

export default ProductsPage;
