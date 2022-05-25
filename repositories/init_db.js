const config = require('../config')
const db = require('../datasource/db.js')
const logger = require('winston')

const init = async () => {
    // initialize movies table
    await db.execute(
        `create table if not exists users 
        (
            id       serial
                constraint users_pk
                    primary key,
            username text not null,
            password text not null
        );
        
        create unique index if not exists users_id_uindex
            on users (id);
        
        create unique index if not exists users_username_uindex
            on users (username);
        
        create table if not exists movies
        (
            id          serial
                constraint movies_pk
                    primary key,
            user_id     int
                constraint movies_users_id_fk
                    references users,
            title       text        not null,
            description text        not null,
            submitter   text        not null,
            created_at  timestamptz not null
        );
        
        create unique index if not exists movies_id_uindex
            on movies (id);
        
        create unique index if not exists movies_title_uindex
            on movies (title);
        
        create table if not exists ratings
        (
            id       serial
                constraint ratings_pk
                    primary key,
            movie_id int not null
                constraint ratings_movies_id_fk
                    references movies,
            user_id  int not null
                constraint ratings_users_id_fk
                    references users,
            liked    bool
        );
        
        create unique index if not exists ratings_id_uindex
            on ratings (id);

        create unique index if not exists ratings_movie_id_user_id_uindex
            on ratings (movie_id, user_id);    
        
        `
    )

    if (config.db.mock_data) {
        try {
        await db.execute(`
            INSERT INTO public.users (id, username, password) VALUES (150, 'test1', '$2b$05$qifYdE2nPDcpB3MkR/ov.O3CWSjqNfCVuxv1Y1VaPRUNLgsutVcyG');
            INSERT INTO public.users (id, username, password) VALUES (151, 'test2', '$2b$05$yoo2zSBFu3ABizOOgwHrRuqZ2sj7LL8l.d2M6yJ1HvA5x9rGZyrQ.');
            INSERT INTO public.users (id, username, password) VALUES (152, 'test3', '$2b$05$jHqxixHEFlg8j2YIf7Nc0.PQcbSIDQxa/FRzS3n9Imorea1TXh7jK');
            INSERT INTO public.users (id, username, password) VALUES (153, 'test4', '$2b$05$TMYSN.mcjPkfygh/m3juOu6qjV2H8f3M3oTY5iXxuuOOg/xXf1KUy');  
            
            INSERT INTO public.movies (id, user_id, title, description, submitter, created_at) VALUES (17, 153, 'Doctor Strange in the Multiverse of Madness', 'Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the multiverse. They seek help from Wanda the Scarlet Witch, Wong and others.', 'test4', '2022-05-24 21:10:13.642000 +00:00');

            INSERT INTO public.movies (id, user_id, title, description, submitter, created_at) VALUES (18, 153, 'Sonic the Hedgehog 2', 'When the manic Dr Robotnik returns to Earth with a new ally, Knuckles the Echidna, Sonic and his new friend Tails is all that stands in their way.', 'test4', '2022-05-24 21:10:26.919000 +00:00');

            INSERT INTO public.movies (id, user_id, title, description, submitter, created_at) VALUES (19, 153, 'The Northman', 'From visionary director Robert Eggers comes The Northman, an action-filled epic that follows a young Viking prince on his quest to avenge his father''s murder.', 'test4', '2022-05-24 21:10:36.102000 +00:00');

            INSERT INTO public.movies (id, user_id, title, description, submitter, created_at) VALUES (20, 152, 'The Bad Guys', 'Several reformed yet misunderstood criminal animals attempt to become good, with some disastrous results along the way.', 'test3', '2022-05-24 21:10:59.403000 +00:00');
            
            INSERT INTO public.movies (id, user_id, title, description, submitter, created_at) VALUES (21, 152, 'The Lost City', 'A reclusive romance novelist on a book tour with her cover model gets swept up in a kidnapping attempt that lands them both in a cutthroat jungle adventure.
            ', 'test3', '2022-05-24 21:11:57.592000 +00:00');
            INSERT INTO public.movies (id, user_id, title, description, submitter, created_at) VALUES (22, 152, 'Uncharted', 'Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor "Sully" Sullivan to recover a fortune amassed by Ferdinand Magellan, and lost 500 years ago by the House of Moncada.
            ', 'test3', '2022-05-24 21:12:08.265000 +00:00');
            INSERT INTO public.movies (id, user_id, title, description, submitter, created_at) VALUES (23, 151, 'Moon Knight', 'Steven Grant discovers he''s been granted the powers of an Egyptian moon god. But he soon finds out that these newfound powers can be both a blessing and a curse to his troubled life.
            ', 'test2', '2022-05-24 21:12:27.448000 +00:00');
            INSERT INTO public.movies (id, user_id, title, description, submitter, created_at) VALUES (24, 151, 'The Batman', 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city''s hidden corruption and question his family''s involvement.
            ', 'test2', '2022-05-24 21:12:35.702000 +00:00');
            INSERT INTO public.movies (id, user_id, title, description, submitter, created_at) VALUES (25, 151, 'Ambulance', 'Two robbers steal an ambulance after their heist goes awry.
            ', 'test2', '2022-05-24 21:12:42.287000 +00:00');
            INSERT INTO public.movies (id, user_id, title, description, submitter, created_at) VALUES (26, 150, 'Doctor Strange', 'While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.
            ', 'test1', '2022-05-24 21:13:03.633000 +00:00');
            
            INSERT INTO public.ratings (id, movie_id, user_id, liked) VALUES (119, 19, 151, true);
            INSERT INTO public.ratings (id, movie_id, user_id, liked) VALUES (120, 18, 151, true);
            INSERT INTO public.ratings (id, movie_id, user_id, liked) VALUES (122, 21, 151, true);
            INSERT INTO public.ratings (id, movie_id, user_id, liked) VALUES (123, 20, 151, false);
            INSERT INTO public.ratings (id, movie_id, user_id, liked) VALUES (124, 26, 151, true);
            INSERT INTO public.ratings (id, movie_id, user_id, liked) VALUES (125, 17, 151, false);
            INSERT INTO public.ratings (id, movie_id, user_id, liked) VALUES (133, 23, 150, false);
            INSERT INTO public.ratings (id, movie_id, user_id, liked) VALUES (135, 17, 150, true);
            INSERT INTO public.ratings (id, movie_id, user_id, liked) VALUES (136, 24, 150, false);
        `)
            logger.log('info', '[Database] mock data insertion successful')
        } catch (err) {
            logger.log('info', `[Database] mock data insertion failed - ${err.message}`)
        }
    }
}

module.exports = {
    init,
}