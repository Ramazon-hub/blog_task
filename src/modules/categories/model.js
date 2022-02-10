const { fetch, fetchAll } = require("../../utils/pg");
const NEW_CATEGORY = `
    insert into categories(
        category_name,
        category_ref_admin
        )values($1,$2) returning
        category_id as id,
        category_name as name,
        category_ref_admin as creater,
        created_at ;
`;
const UPDATE_CATEGORY = `
    update categories
        set category_name=$1
        where category_id=$2
      returning *
`;
const FIND_CATEGORY = `
      select 
        * from
      categories where category_id=$1 and category_ref_admin=$2
`;
const DELETE_CATEGORY = `
  delete from categories where category_id=$1 returning * ;
    `;
const ALL_CATEGORY = `
      select 
        category_id as id,
        category_name as name,
        created_at
      from 
        categories;
    `;
const ADMIN_CATEGORY = `
    select 
        category_id as id,
        category_name as name,
        created_at
    from 
        categories 
    where 
      category_ref_admin=$1;
    `;
const newCategory = (...values) => fetch(NEW_CATEGORY, values);
const updateCategory = (...values) => fetch(UPDATE_CATEGORY, values);
const findCategory = (...values) => fetch(FIND_CATEGORY, values);
const deleteCategory = (...values) => fetch(DELETE_CATEGORY, values);
const allCategory = (...values) => fetchAll(ALL_CATEGORY, values);
const allAdminCategory = (...values) => fetchAll(ADMIN_CATEGORY, values);

module.exports = {
  updateCategory,
  newCategory,
  findCategory,
  deleteCategory,
  allCategory,
  allAdminCategory,
};
