const { fetch, fetchAll } = require("../../utils/pg");
const NEW_POST = `
    insert into posts(
        post_title,
        post_content,
        post_imgs,
        post_ref_admin,
        post_ref_category
        )values($1,$2,$3,$4,$5) returning
        post_id as id,
        post_title as title,
        post_content as content,
        post_imgs as images,
        post_ref_admin as author,
        post_ref_category as category,
        created_at ;
`;
const UPDATE_POST = `
    update posts
        set post_title=$1,
        post_content=$2,
        post_imgs=$3,
        post_ref_category=$4,
        created_at=current_timestamp
        where post_id=$5
      returning *`;
const FIND_POST = `
      select 
      post_title as title,
      post_content as content,
      post_imgs as images,  
      post_ref_category as category,
      created_at
      from
      posts where post_id=$1 and post_ref_admin=$2
`;
const DELETE_POST = `
  delete from posts where post_id=$1 returning * ;
    `;
const ALL_POST = `
      select 
        p.post_id as id,
        p.post_title as title,
        p.post_content as content,
        p.post_imgs as images,
        c.category_name as category,
        a.admin_fullname as author,
        p.created_at 
      from 
        posts as p
      inner join 
        admins as a
      on 
        a.admin_id=p.post_ref_admin 
      inner join
        categories as c
      on
        c.category_id=p.post_ref_category
      order by p.created_at desc;
    `;
const ALL_POST_BY_CATEGORY = `
      select 
        p.post_id as id,
        p.post_title as title,
        p.post_content as content,
        p.post_imgs as images,
        c.category_name as category,
        a.admin_fullname as author,
        p.created_at 
      from 
        posts as p
      inner join 
        admins as a
      on 
        a.admin_id=p.post_ref_admin 
      inner join
        categories as c
      on
        c.category_id=p.post_ref_category
      where p.post_ref_category=$1
      order by p.created_at desc;
    `;
const ADMIN_POST = `
  select 
        p.post_id as id,
        p.post_title as title,
        p.post_content as content,
        p.post_imgs as images,
        c.category_name as category,
        a.admin_fullname as author,
        p.created_at 
  from 
        posts as p
  inner join 
        admins as a
  on 
        a.admin_id=p.post_ref_admin 
  inner join
        categories as c
  on
        c.category_id=p.post_ref_category
  where 
    p.post_ref_admin=$1
  order by p.created_at desc;
    `;
const updatePost = (...values) => fetch(UPDATE_POST, values);
const findPost = (...values) => fetch(FIND_POST, values);
const deletePost = (...values) => fetch(DELETE_POST, values);
const allPost = (...values) => fetchAll(ALL_POST, values);
const allAdminPost = (...values) => fetchAll(ADMIN_POST, values);
const allPostByCategory = (...values) => fetchAll(ALL_POST_BY_CATEGORY, values);

const newPost = (...values) => fetch(NEW_POST, values);
module.exports = {
  newPost,
  updatePost,
  findPost,
  deletePost,
  allPost,
  allAdminPost,
  allPostByCategory,
};
