// import { defineStore } from "pinia";

// const defaultBlogs = [
//     {
//         id: "1",
//         title: "The Rise of Quantum Computing: What You Need to Know",
//         cover:
//             "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
//         author: "Dr. Alice Kim",
//         authorEmail: "alice.kim@techinsights.com",
//         authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
//         designation: "Quantum Research Lead, TechInsights",
//         date: "2024-04-10",
//         content:
//             "<p>Quantum computing is revolutionizing the way we solve complex problems. Unlike classical computers, quantum computers use qubits, which can represent both 0 and 1 simultaneously. This allows them to process information exponentially faster for certain tasks. Major tech companies are investing heavily in quantum research, and breakthroughs in error correction and qubit stability are making practical applications more feasible. From cryptography to drug discovery, quantum computing promises to unlock new possibilities. However, challenges remain, including hardware scalability and the need for new algorithms. As the field matures, we can expect quantum computing to become an integral part of the technology landscape, driving innovation across industries.</p>",
//     },
//     {
//         id: "2",
//         title: "AI in Healthcare: Transforming Patient Outcomes",
//         cover:
//             "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
//         author: "Dr. Michael Chen",
//         authorEmail: "michael.chen@medai.com",
//         authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
//         designation: "Chief Medical Officer, MedAI",
//         date: "2024-03-22",
//         content:
//             "<p>Artificial Intelligence is making significant strides in healthcare, from diagnostics to personalized treatment plans. Machine learning algorithms can analyze vast amounts of medical data, identifying patterns that may be missed by human clinicians. AI-powered imaging tools are improving the accuracy of diagnoses, while predictive analytics help in early detection of diseases. Despite concerns about data privacy and the need for regulatory oversight, the integration of AI in healthcare is leading to better patient outcomes and more efficient care delivery. As technology advances, collaboration between healthcare professionals and AI systems will become increasingly important.</p>",
//     },
//     {
//         id: "3",
//         title: "Edge Computing: Bringing Data Processing Closer to You",
//         cover:
//             "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
//         author: "Priya Nair",
//         authorEmail: "priya.nair@edgeworks.com",
//         authorImage: "https://randomuser.me/api/portraits/women/68.jpg",
//         designation: "Edge Solutions Architect, EdgeWorks",
//         date: "2024-02-15",
//         content:
//             "<p>Edge computing is a paradigm shift that brings computation and data storage closer to the sources of data. This reduces latency and bandwidth usage, making it ideal for applications like IoT, autonomous vehicles, and real-time analytics. By processing data at the edge, organizations can achieve faster response times and improved reliability. Security is also enhanced, as sensitive data can be processed locally rather than sent to a central server. As 5G networks expand, edge computing will play a crucial role in enabling next-generation applications and services.</p>",
//     },
//     {
//         id: "4",
//         title: "Blockchain Beyond Cryptocurrency: Real-World Applications",
//         cover:
//             "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
//         author: "Satoshi Lee",
//         authorEmail: "satoshi.lee@blockchainhub.com",
//         authorImage: "https://randomuser.me/api/portraits/men/85.jpg",
//         designation: "Blockchain Evangelist, BlockchainHub",
//         date: "2024-01-30",
//         content:
//             "<p>While blockchain technology is best known as the foundation of cryptocurrencies, its potential extends far beyond digital currencies. Blockchain offers a secure, transparent, and tamper-proof way to record transactions, making it valuable for supply chain management, voting systems, and digital identity verification. Enterprises are exploring blockchain for smart contracts, which automate and enforce agreements without intermediaries. As adoption grows, interoperability and scalability will be key challenges to address. The future of blockchain lies in its ability to transform industries by enabling trust and transparency.</p>",
//     },
//     {
//         id: "5",
//         title: "Cybersecurity in the Age of Remote Work",
//         cover:
//             "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
//         author: "Elena Petrova",
//         authorEmail: "elena.petrova@cybersecure.com",
//         authorImage: "https://randomuser.me/api/portraits/women/65.jpg",
//         designation: "Cybersecurity Analyst, CyberSecure",
//         date: "2024-04-01",
//         content:
//             "<p>The shift to remote work has introduced new cybersecurity challenges for organizations. Employees accessing corporate resources from home networks are more vulnerable to phishing attacks, malware, and data breaches. Companies must implement robust security protocols, including multi-factor authentication, VPNs, and regular security training. Endpoint security and monitoring are critical to detect and respond to threats in real time. As remote work becomes the norm, a proactive approach to cybersecurity is essential to protect sensitive information and maintain business continuity.</p>",
//     },
//     {
//         id: "6",
//         title: "The Future of 5G: Unlocking New Possibilities",
//         cover:
//             "https://images.unsplash.com/photo-1467987506553-8f3916508521?auto=format&fit=crop&w=800&q=80",
//         author: "Carlos Martinez",
//         authorEmail: "carlos.martinez@5gconnect.com",
//         authorImage: "https://randomuser.me/api/portraits/men/41.jpg",
//         designation: "Telecom Futurist, 5GConnect",
//         date: "2024-03-10",
//         content:
//             "<p>5G technology is set to revolutionize connectivity, offering ultra-fast speeds, low latency, and massive device support. This will enable innovations such as smart cities, autonomous vehicles, and immersive AR/VR experiences. Telecom providers are rapidly expanding 5G networks, but challenges remain, including infrastructure costs and spectrum allocation. As 5G becomes more widespread, it will drive economic growth and transform the way we live and work. The full potential of 5G will be realized as new applications and services emerge, leveraging its capabilities.</p>",
//     },
//     {
//         id: "7",
//         title: "Cloud-Native Development: Building for Scalability",
//         cover:
//             "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
//         author: "Fatima Zahra",
//         authorEmail: "fatima.zahra@cloudnative.com",
//         authorImage: "https://randomuser.me/api/portraits/women/50.jpg",
//         designation: "Lead Cloud Engineer, CloudNative",
//         date: "2024-02-28",
//         content:
//             "<p>Cloud-native development is an approach that leverages microservices, containers, and continuous integration/continuous deployment (CI/CD) to build scalable and resilient applications. By designing applications specifically for the cloud, organizations can achieve greater agility and faster time-to-market. Kubernetes has emerged as the de facto standard for container orchestration, enabling automated scaling and management. As businesses embrace digital transformation, cloud-native development will be key to staying competitive in a rapidly evolving landscape.</p>",
//     },
//     {
//         id: "8",
//         title: "Augmented Reality: Bridging the Physical and Digital Worlds",
//         cover:
//             "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
//         author: "Lucas Wang",
//         authorEmail: "lucas.wang@arvision.com",
//         authorImage: "https://randomuser.me/api/portraits/men/76.jpg",
//         designation: "AR Product Manager, ARVision",
//         date: "2024-01-18",
//         content:
//             "<p>Augmented Reality (AR) is transforming the way we interact with the world by overlaying digital information onto our physical environment. From gaming and entertainment to education and retail, AR applications are enhancing user experiences and creating new opportunities for engagement. Advances in hardware and software are making AR more accessible and immersive. As the technology matures, we can expect AR to become an integral part of everyday life, blurring the lines between the physical and digital worlds.</p>",
//     },
//     {
//         id: "9",
//         title: "Sustainable Tech: Innovations for a Greener Future",
//         cover:
//             "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
//         author: "Greta Müller",
//         authorEmail: "greta.muller@sustaintech.com",
//         authorImage: "https://randomuser.me/api/portraits/women/12.jpg",
//         designation: "Sustainability Lead, SustainTech",
//         date: "2024-03-05",
//         content:
//             "<p>Technology is playing a vital role in addressing environmental challenges and promoting sustainability. Innovations such as renewable energy, smart grids, and energy-efficient devices are reducing carbon footprints and conserving resources. Companies are adopting circular economy principles, designing products for reuse and recycling. As consumers become more environmentally conscious, demand for sustainable tech solutions will continue to grow. The future of technology is green, with a focus on creating a more sustainable and equitable world.</p>",
//     },
//     {
//         id: "10",
//         title: "The Evolution of DevOps: From Automation to Culture",
//         cover:
//             "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
//         author: "Rajesh Kumar",
//         authorEmail: "rajesh.kumar@devopspro.com",
//         authorImage: "https://randomuser.me/api/portraits/men/23.jpg",
//         designation: "DevOps Consultant, DevOpsPro",
//         date: "2024-02-10",
//         content:
//             "<p>DevOps has evolved from a set of automation tools to a cultural movement that emphasizes collaboration, communication, and continuous improvement. By breaking down silos between development and operations teams, organizations can deliver software faster and more reliably. Key practices include infrastructure as code, automated testing, and continuous delivery. As DevOps matures, the focus is shifting towards observability, security, and empowering teams to take ownership of the entire software lifecycle. The future of DevOps lies in its ability to drive innovation and agility across organizations.</p>",
//     },
// ];

// export const useBlogStore = defineStore("blog", {
//     state: () => ({
//         blogs: JSON.parse(localStorage.getItem("blogs") || "null") || defaultBlogs,
//         user: JSON.parse(localStorage.getItem("user") || "{}"),
//     }),
//     actions: {
//         addBlog(blog) {
//             this.blogs.push(blog);
//             localStorage.setItem("blogs", JSON.stringify(this.blogs));
//         },
//         setUser(user) {
//             this.user = user;
//             localStorage.setItem("user", JSON.stringify(user));
//         },
//         logout() {
//             this.user = {};
//             localStorage.removeItem("user");
//         },
//     },
// });

import { defineStore } from "pinia";
import axios from "axios";

const defaultBlogs = [
    {
        title: "The Rise of Quantum Computing: What You Need to Know",
        imgLink:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
        content:
            "Quantum computing is revolutionizing the way we solve complex problems. Unlike classical computers, quantum computers use qubits, which can represent both 0 and 1 simultaneously. This allows them to process information exponentially faster for certain tasks. Major tech companies are investing heavily in quantum research, and breakthroughs in error correction and qubit stability are making practical applications more feasible. From cryptography to drug discovery, quantum computing promises to unlock new possibilities. However, challenges remain, including hardware scalability and the need for new algorithms. As the field matures, we can expect quantum computing to become an integral part of the technology landscape, driving innovation across industries.",
    },
    {
        title: "AI in Healthcare: Transforming Patient Outcomes",
        imgLink:
            "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
        content:
            "Artificial Intelligence is making significant strides in healthcare, from diagnostics to personalized treatment plans. Machine learning algorithms can analyze vast amounts of medical data, identifying patterns that may be missed by human clinicians. AI-powered imaging tools are improving the accuracy of diagnoses, while predictive analytics help in early detection of diseases. Despite concerns about data privacy and the need for regulatory oversight, the integration of AI in healthcare is leading to better patient outcomes and more efficient care delivery. As technology advances, collaboration between healthcare professionals and AI systems will become increasingly important.",
    },
    {
        title: "Edge Computing: Bringing Data Processing Closer to You",
        imgLink:
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
        content:
            "Edge computing is a paradigm shift that brings computation and data storage closer to the sources of data. This reduces latency and bandwidth usage, making it ideal for applications like IoT, autonomous vehicles, and real-time analytics. By processing data at the edge, organizations can achieve faster response times and improved reliability. Security is also enhanced, as sensitive data can be processed locally rather than sent to a central server. As 5G networks expand, edge computing will play a crucial role in enabling next-generation applications and services.",
    },
    {
        title: "Blockchain Beyond Cryptocurrency: Real-World Applications",
        imgLink:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        content:
            "While blockchain technology is best known as the foundation of cryptocurrencies, its potential extends far beyond digital currencies. Blockchain offers a secure, transparent, and tamper-proof way to record transactions, making it valuable for supply chain management, voting systems, and digital identity verification. Enterprises are exploring blockchain for smart contracts, which automate and enforce agreements without intermediaries. As adoption grows, interoperability and scalability will be key challenges to address. The future of blockchain lies in its ability to transform industries by enabling trust and transparency.",
    },
    {
        title: "Cybersecurity in the Age of Remote Work",
        imgLink:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
        content:
            "The shift to remote work has introduced new cybersecurity challenges for organizations. Employees accessing corporate resources from home networks are more vulnerable to phishing attacks, malware, and data breaches. Companies must implement robust security protocols, including multi-factor authentication, VPNs, and regular security training. Endpoint security and monitoring are critical to detect and respond to threats in real time. As remote work becomes the norm, a proactive approach to cybersecurity is essential to protect sensitive information and maintain business continuity.",
    },
    {
        title: "The Future of 5G: Unlocking New Possibilities",
        imgLink:
            "https://images.unsplash.com/photo-1467987506553-8f3916508521?auto=format&fit=crop&w=800&q=80",
        content:
            "5G technology is set to revolutionize connectivity, offering ultra-fast speeds, low latency, and massive device support. This will enable innovations such as smart cities, autonomous vehicles, and immersive AR/VR experiences. Telecom providers are rapidly expanding 5G networks, but challenges remain, including infrastructure costs and spectrum allocation. As 5G becomes more widespread, it will drive economic growth and transform the way we live and work. The full potential of 5G will be realized as new applications and services emerge, leveraging its capabilities.",
    },
    {
        title: "Cloud-Native Development: Building for Scalability",
        imgLink: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
        content:
            "Cloud-native development is an approach that leverages microservices, containers, and continuous integration/continuous deployment (CI/CD) to build scalable and resilient applications. By designing applications specifically for the cloud, organizations can achieve greater agility and faster time-to-market. Kubernetes has emerged as the de facto standard for container orchestration, enabling automated scaling and management. As businesses embrace digital transformation, cloud-native development will be key to staying competitive in a rapidly evolving landscape.",
    },
    {
        title: "Augmented Reality: Bridging the Physical and Digital Worlds",
        imgLink:
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        content:
            "Augmented Reality (AR) is transforming the way we interact with the world by overlaying digital information onto our physical environment. From gaming and entertainment to education and retail, AR applications are enhancing user experiences and creating new opportunities for engagement. Advances in hardware and software are making AR more accessible and immersive. As the technology matures, we can expect AR to become an integral part of everyday life, blurring the lines between the physical and digital worlds.",
    },
    {
        title: "Sustainable Tech: Innovations for a Greener Future",
        imgLink:
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
        content:
            "Technology is playing a vital role in addressing environmental challenges and promoting sustainability. Innovations such as renewable energy, smart grids, and energy-efficient devices are reducing carbon footprints and conserving resources. Companies are adopting circular economy principles, designing products for reuse and recycling. As consumers become more environmentally conscious, demand for sustainable tech solutions will continue to grow. The future of technology is green, with a focus on creating a more sustainable and equitable world.",
    },
    {
        title: "The Evolution of DevOps: From Automation to Culture",
        imgLink:
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
        content:
            "DevOps has evolved from a set of automation tools to a cultural movement that emphasizes collaboration, communication, and continuous improvement. By breaking down silos between development and operations teams, organizations can deliver software faster and more reliably. Key practices include infrastructure as code, automated testing, and continuous delivery. As DevOps matures, the focus is shifting towards observability, security, and empowering teams to take ownership of the entire software lifecycle. The future of DevOps lies in its ability to drive innovation and agility across organizations.",
    },
];

export const useBlogStore = defineStore("blog", {
    state: () => ({
        blogs: [...defaultBlogs], // Initialize with default blogs
    }),
    actions: {
        async fetchBlogs() {
            try {
                const response = await axios.get("http://localhost:8000/posts");
                this.blogs = response.data;
                console.log(this.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        },
        async addBlog(blog) {
            try {
                const response = await axios.post(
                    "http://localhost:8000/upPosts",
                    blog
                );
                this.blogs.unshift(response.data.data); // Add the new blog to the top of the list
                return true; // Indicate success
            } catch (error) {
                console.error("Error adding blog:", error);
                return false; // Indicate failure
            }
        },
    },
});
