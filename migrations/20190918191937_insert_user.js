
exports.up = function(knex) {
    return knex('users')
    .insert({ id: '7b10d185-5084-492b-821a-c834e7120b80', email: 'hi@example.com', password: '123456' })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
