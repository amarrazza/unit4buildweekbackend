exports.up = async function (knex) {
  await knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl.string("username", 255).notNullable().unique();
    tbl.integer("phoneNumber", 10).notNullable();
    tbl.string("password", 255).notNullable();
  })
  await knex.schema.createTable('plants', tbl => {
      tbl.increments();
      tbl.string("nickname").notNullable().unique();
      tbl.string("species").notNullable().unique();
      tbl.string("h20frequency").notNullable();
  })
};

exports.down = async function (knex) {
  await knex.schema
  .dropTableIfExists("users")
  .dropTableIfExists("plants")
};
