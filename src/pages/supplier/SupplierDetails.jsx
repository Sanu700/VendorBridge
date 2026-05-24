import { useParams } from "react-router-dom";

const suppliers = {
  "1": {
    name: "Ram Agro Traders",
    category: "Vegetables & Grains",
    location: "Azadpur Mandi, Delhi",
    rating: 4.8,
    products: [
      {
        name: "Basmati Rice",
        price: "₹85/kg",
      },
      {
        name: "Toor Dal",
        price: "₹110/kg",
      },
      {
        name: "Potato",
        price: "₹25/kg",
      },
    ],
  },

  "2": {
    name: "Spice Route Wholesale",
    category: "Spices",
    location: "Khari Baoli, Delhi",
    rating: 4.6,
    products: [
      {
        name: "Turmeric Powder",
        price: "₹320/kg",
      },
      {
        name: "Red Chilli Powder",
        price: "₹290/kg",
      },
    ],
  },
};

export default function SupplierDetails() {

  const { id } = useParams();

  const supplier =
    suppliers[id];

  if (!supplier) {
    return (
      <div
        style={{
          padding: 40,
        }}
      >
        Supplier not found
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 32,
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          marginBottom: 8,
        }}
      >
        {supplier.name}
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: 20,
        }}
      >
        {supplier.location}
      </p>

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 28,
          flexWrap: "wrap",
        }}
      >
        <div className="badge badge-orange">
          {supplier.category}
        </div>

        <div className="badge">
          ⭐ {supplier.rating}
        </div>
      </div>

      <h2
        style={{
          marginBottom: 18,
        }}
      >
        Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",
          gap: 18,
        }}
      >
        {supplier.products.map(
          (product) => (
            <div
              key={product.name}
              style={{
                padding: 20,
                borderRadius: 18,
                border:
                  "1px solid #eee",
                background: "#fff",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {product.name}
              </h3>

              <p
                style={{
                  color: "#e8622a",
                  fontWeight: 700,
                }}
              >
                {product.price}
              </p>

              <button
                style={{
                  marginTop: 16,
                  width: "100%",
                  padding: 12,
                  borderRadius: 12,
                  border: "none",
                  background:
                    "linear-gradient(135deg,#e8622a,#f5a623)",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Contact Supplier
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
