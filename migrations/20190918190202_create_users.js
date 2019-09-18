exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.uuid('id').primary();

        table.string('email').unique().notNull();
        table.string('password').notNull();

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        
        table.index(['email'], 'users_email')
	});
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
