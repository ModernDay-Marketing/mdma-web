# Modern Day

Enterprise-focused landing page for Modern Day, built with Vite, React, and GSAP.

## Local development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
```

## Supabase CMS

The private editor lives at `/studio`.

1. Create a Supabase project.
2. Run `supabase/migrations/202607310001_case_study_cms.sql` in the SQL editor.
3. Create the editor account under Authentication → Users.
4. Authorize it in the SQL editor:

```sql
insert into public.cms_users (user_id)
select id from auth.users where email = 'your-email@example.com';
```

5. Copy `.env.example` to `.env.local` and add the project URL and publishable key.
6. Add the service-role key only to the terminal session used for migration, then import the existing cases:

```sh
npm run seed:cms
```

Never expose the service-role key in a `VITE_` variable or in browser code.
# mdma-web
# md-web
# mdma
