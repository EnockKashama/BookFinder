exports.up =
    function(knex) {
  return knex.schema

    .createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
  table.string('email').unique().notNullable()
  table.string('phone').unique()
  table.string('display_name')
  table.string('photo_url')
  table.boolean('phone_verified').defaultTo(false)
  table.float('rating').defaultTo(0)
  table.integer('rating_count').defaultTo(0)
      table.timestamps(true, true)
    })

    .createTable('book_listings', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
      table.uuid('seller_id')
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
      table.string('isbn')
      table.string('title').notNullable()
      table.string('author')
      table.string('cover_url')
      table.text('description')
      table.enum('condition', ['brand_new', 'like_new', 'good', 'fair', 'old'])
          .notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.string('area')
      table.float('lat')
      table.float('lng')
      table.enum('status', ['active', 'sold', 'removed']).defaultTo('active')
      table.timestamps(true, true)
    })

    .createTable('book_requests', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
      table.uuid('buyer_id')
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('author')
      table.string('isbn')
      table.float('lat')
      table.float('lng')
      table.integer('radius_km').defaultTo(10)
      table.timestamps(true, true)
    })

    .createTable('chats', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
      table.uuid('listing_id')
          .references('id')
          .inTable('book_listings')
          .onDelete('CASCADE')
      table.uuid('buyer_id').references('id').inTable('users')
      table.uuid('seller_id').references('id').inTable('users')
      table.enum('status', ['active', 'completed', 'reported'])
          .defaultTo('active')
      table.timestamps(true, true)
    })

    .createTable('messages', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
      table.uuid('chat_id').references('id').inTable('chats').onDelete(
          'CASCADE')
      table.uuid('sender_id').references('id').inTable('users')
      table.text('content').notNullable()
      table.timestamps(true, true)
    })
}

    exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages')
      .dropTableIfExists('chats')
      .dropTableIfExists('book_requests')
      .dropTableIfExists('book_listings')
      .dropTableIfExists('users')
}
