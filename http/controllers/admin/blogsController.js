const express = require("express");
const Models = require("../../../database/models")

async function newBlog(req, res) {
    
    try {
        let { title, excerpt, description, featured_image, created_by, tags, status } = req.body;
        // creating unique
        let slug
        await setSlug(title).then((response) => {
            console.log("resp",response)
            slug=response
        }); 
        let blogData = {
            title,
            slug: slug,
            excerpt, 
            description,
            featured_image,
            created_by,
            tags, 
            status 
        };

        let blog = await Models.Blogs(blogData).save();
        if(blog && blog._id){
            res.send({
                status: 200, 
                message: "Blog Created Successfully",
                blog 
            });
        } else {
            res.send({
                status: 300, 
                message: "Unable to Create Blog"
            });
        }


    } catch (error) {
        res.send({
            status: 400, 
            message: "An Unknow Error Occured!", 
            error
        })
    }

}

async function getAllBlog(req, res) {
    try {
        let blogs = await Models.Blogs.find({});
        if(Object.keys(blogs).length > 0){
            res.send({
                status: 200, 
                message: "Blogs Restrived Successfully", 
                blogs
            });
        } else {
            res.send({
                status: 300, 
                message: "Blogs Not Found!", 
            });
        }
    } catch (error) {
        res.send({
            status: 400, 
            message: "An Unknown error occured", 
            error
        });
    }
}

async function getSpecificBlog(req, res) {
    try {
        let slug = req.params.slug;
        let blog = await Models.Blogs.findOne({ slug: slug });
        if(blog && blog._id) {
            res.send({
                status: 200, 
                message: "Blog Restrived successfully", 
                blog 
            });
        } else {
            res.send({
                status: 300, 
                message: "Blog Not Found!",
            })
        }

    } catch (error) {
        res.send({
            status: 400, 
            message: "An Unknown error occured", 
            error
        });
    }
}

async function updateBlog(req, res) {
    try {
        let { id, title, excerpt, description, featured_image, tags, status } = req.body;
        // creating unique
        let slug
        await setSlug(title).then((response) => {
            console.log("resp",response)
            slug=response
        }); 
        let blogData = {
            title,
            slug: slug,
            excerpt, 
            description,
            featured_image,
            updated_at: Date.now(),
            tags, 
            status 
        };

        let blog = await Models.Blogs.findOneAndUpdate({ _id: id }, { $set: blogData });

        if(blog && blog._id){
            let updatedContent = await Models.Blogs.findOne({_id:id});
            res.send({
                status: 200, 
                message: "Blog Updated Successfully",
                updatedContent 
            });
        } else {
            res.send({
                status: 300, 
                message: "Unable to Create Blog"
            });
        }


    } catch (error) {
        res.send({
            status: 400, 
            message: "An Unknow Error Occured!", 
            error
        })
    }
}

async function deleteBlog(req, res) {
    try {
      let { id }   = req.body;
      let blog = await Models.Blogs.deleteOne({ _id: id });
      if(blog.deletedCount > 0){
        res.send({
            status: 200, 
            message: "Blog deleted successfully"
        });
      } else {
        res.send({
            status: 300, 
            message: "Blog Not Found!"
        });
      }
    } catch (error) {
        res.send({
            status: 400, 
            message: "An Unknow Error Occured!", 
            error
        })
    }
}


// ****************************************************
// Utility functions for blog
// ****************************************************

async function setSlug(blog_title) {
    // remove special chars, trim spaces, replace all spaces to dashes, lowercase everything
    var slug = blog_title.replace(/[^\w\s]/gi, '').trim().replace(/\s+/g, '-').toLowerCase();
    var temp_slug=slug;
    // check if same slug exist
    let blog = await Models.Blogs.findOne({ slug: slug });
    let count = 1;
    while(blog && blog._id){    
        temp_slug = slug.concat("-" + count++);
        blog = await Models.Blogs.findOne({ slug: temp_slug });
    } 
    slug=temp_slug
    return slug;
}

module.exports = {
    newBlog, 
    getAllBlog,
    getSpecificBlog,
    updateBlog,
    deleteBlog
}