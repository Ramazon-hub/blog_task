const { fetch, fetchAll } = require("../../utils/pg");
const NEW_ADMIN = `
    insert into admins(
        admin_fullname,
        admin_username,
        admin_password,
        admin_img
        )values($1,$2,$3,$4) returning
        admin_id as id,
        admin_fullname as name,
        admin_username as username,
        admin_password as password,
        admin_img as avatar,
        admin_status as status,
        is_super as issuper
`;
const FIND_ADMIN = `
select 
      admin_id as id,
      admin_password as password,
      is_super as issuper
      from admins where admin_username=$1;
`;
const FIND_UPDATE = `
select 
      admin_fullname as fullname,
      admin_username as username,
      admin_password as password,
      admin_img as avatar
      from admins where admin_id=$1;
`;
const DELETE_ADMIN = `
  delete from admins where admin_id=$1 returning * ;
    `;
const UPDATE_ADMIN = `
      update admins 
      set admin_fullname=$1,
          admin_username=$2,
          admin_password=$3,
          admin_img=$4
      where admin_id=$5 returning
      admin_id as id,
      admin_fullname as name,
      admin_username as username,
      admin_password as password,
      admin_img as avatar,
      admin_status as status,
      is_super as issuper;

  `;
const ALL_ADMINS = `
      select 
        admin_id as id,
        admin_fullname as fullname,
        admin_username as username,
        admin_password as password,
        admin_img as avatar,
        admin_status as status,
        is_super as issuper
      from admins;
  `;
const newAdmin = (...values) => fetch(NEW_ADMIN, values);
const findAdmin = (...values) => fetch(FIND_ADMIN, values);
const findUpdate = (...values) => fetch(FIND_UPDATE, values);
const allAdmins = (...values) => fetchAll(ALL_ADMINS, values);

const deleteAdmin = (...values) => fetch(DELETE_ADMIN, values);
const updateAdmin = (...values) => fetch(UPDATE_ADMIN, values);

module.exports = {
  newAdmin,
  findAdmin,
  deleteAdmin,
  updateAdmin,
  findUpdate,
  allAdmins,
};
