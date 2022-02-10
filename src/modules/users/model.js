const { fetch, fetchAll } = require("../../utils/pg");
const NEW_USER = `
    insert into users(
        user_fullname,
        user_phone,
        user_username,
        user_password,
        user_ref_category,
        user_avatar
        )values($1,$2,$3,$4,$5,$6) returning
        user_id as id,
        user_fullname as fullname,
        user_phone as phoneNumber,
        user_username as username,
        user_password as password,
        user_ref_category as category,
        user_avatar as avatar;
`;
const FIND_USER = `
select 
      user_id as id,
      user_username as username,
      user_password as password
      from users where user_username=$1
`;
const FIND_UPDATE = `
select 
      user_fullname as fullname,
      user_phone as phone,
      user_username as username,
      user_password as password,
      user_avatar as avatar,
      user_ref_category as interestedCategory
      from users where user_id=$1;
`;
const DELETE_USER = `
  delete from users where user_id=$1 returning * ;
    `;
const UPDATE_USER = `
      update users 
      set user_fullname=$1,
          user_phone=$2,
          user_username=$3,
          user_password=$4,
          user_avatar=$5,
          user_ref_category=$6
      where user_id=$7 returning
      *;

  `;
const ALL_AUSER = `
      select 
        user_id as id,
        user_fullname as fullname,
        user_phone as phone,
        user_username as username,
        user_password as password,
        user_avatar as avatar,
        c.category_name as interestedCategory
        from users as u
        inner join
        categories as c
        on u.user_ref_category=c.category_id
  `;
const findUpdate = (...values) => fetch(FIND_UPDATE, values);
const allUsers = (...values) => fetchAll(ALL_AUSER, values);

const deleteUser = (...values) => fetch(DELETE_USER, values);
const updateUser = (...values) => fetch(UPDATE_USER, values);

const newUser = (...values) => fetch(NEW_USER, values);
const findUser = (...values) => fetch(FIND_USER, values);

module.exports = {
  newUser,
  findUser,
  findUpdate,
  allUsers,
  deleteUser,
  updateUser,
};
