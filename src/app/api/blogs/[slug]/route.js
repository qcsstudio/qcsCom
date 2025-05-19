import connectMongo from "@/lib/mongodb";
import Blog from "@/models/blog";

export async function GET(req,{params}){
    try {
        await connectMongo();
        // const slug = await decodeURIComponent(params.slug);
        const slugData = await params.slug;

        const blog = await Blog.findOne({heading:slugData});

        return Response.json({ message: 'Blog Data get successfully', blog_data: blog } , {status:200});

    } catch (error) {
        console.log('Blog Error Server:', error);
        return  Response.json({ message: 'Blog not get Error' } , {status:500});
    }
}

export async function DELETE(req,{params}){
    try {
        await connectMongo();
        const slug = decodeURIComponent(params.slug);
       
        const blog = await Blog.findOneAndDelete({heading:slug});
        console.log(blog);
        const blogs = await Blog.find();

        return Response.json({ message: 'Blog Data get successfully', blog_data: blogs } , {status:200});

    } catch (error) {
        console.error('Blog Error:', error);
        return  Response.json({ message: 'Blog not get Error' } , {status:500});
    }
}

export async function PUT(req,{params}){
    try {
        await connectMongo();
        const slug = decodeURIComponent(params.slug);
        
        const { title, thumbnail, category, showOnFront, description, metaTitle, metaDescription } = await req.json();

        const updatedBlog = await Blog.findOneAndUpdate({heading: slug},
            {heading:title,thumbnail:thumbnail,category:category,show_on_front:showOnFront,description:description,metaTitle,metaDescription},{ new: true});
        
        const blogs = await Blog.find();
        
        return Response.json({ message: 'Blog Data Updated successfully', blog_data: blogs } , {status:200});

    } catch (error) {
        console.log('Blog Error:', error);
        return  Response.json({ message: 'Blog not get Error' } , {status:500});
    }
}