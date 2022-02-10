create database blog_task;
create extension if not exists "uuid-ossp";
create table admins(
    admin_id uuid not null default uuid_generate_v4() primary key,
    admin_fullname text not null,
    admin_username text not null,
    admin_password text not null,
    admin_img text default null,
    admin_status boolean default true,
    is_super boolean default false,
    created_at timestamp with time zone not null default current_timestamp
);
create table categories(
    category_id uuid not null default uuid_generate_v4() primary key,
    category_name text not null,
    category_ref_admin uuid not null,
    constraint fk_category_ref_admin
    foreign key (category_ref_admin)
    references admins(admin_id)
    on delete cascade,
    created_at timestamp with time zone not null default current_timestamp
);
create table posts(
    post_id uuid not null default uuid_generate_v4() primary key,
    post_title text not null,
    post_content text not null,
    post_imgs text [] not null,
    post_ref_admin uuid not null,
    post_ref_category uuid not null,
    created_at timestamp with time zone not null default current_timestamp,
    constraint fk_post_ref_admin
    foreign key (post_ref_admin)
    references admins(admin_id)
    on delete cascade,
    constraint fk_post_ref_category
    foreign key (post_ref_category)
    references categories(category_id)
    on delete cascade
);
create table users(
    user_id uuid not null default uuid_generate_v4() primary key,
    user_fullname text not null,
    user_phone text not null,
    user_username text unique not null,
    user_password text not null,
    user_ref_category uuid not null,
    user_avatar text default null ,
    created_at timestamp with time zone not null default current_timestamp,
    constraint fk_user_ref_category
    foreign key (user_ref_category)
    references categories(category_id)
    on delete cascade
);