#!/bin/bash

echo "Waiting for WordPress to be ready..."
until wp core is-installed --allow-root --path=/var/www/html 2>/dev/null; do
  sleep 3
done

echo "Installing WPGraphQL..."
wp plugin install wp-graphql --activate --allow-root --path=/var/www/html

echo "Setting environment type to enable Application Passwords..."
wp config set WP_ENVIRONMENT_TYPE 'local' --allow-root --path=/var/www/html

echo "Fixing site URL..."
wp option update siteurl 'http://localhost:8080' --allow-root --path=/var/www/html
wp option update home 'http://localhost:8080' --allow-root --path=/var/www/html
wp search-replace 'http://wp-blog-home-task.local' 'http://localhost:8080' \
  --allow-root \
  --path=/var/www/html \
  --skip-columns=guid

echo "Setting permalinks..."
wp rewrite structure '/%postname%/' --allow-root --path=/var/www/html
wp rewrite flush --allow-root --path=/var/www/html

echo "Configuring WPGraphQL..."
wp option update graphql_general_settings \
  '{"graphql_endpoint":"graphql","restrict_endpoint_to_logged_in_users":"on","public_introspection_enabled":"on","batch_queries_enabled":"on","batch_limit":10,"query_depth_enabled":"off","query_depth_max":10,"graphiql_enabled":"on"}' \
  --format=json --allow-root --path=/var/www/html

echo "Creating application password..."
# Skip if a password file already exists: nextjs reads it at startup, and
# revoking-and-recreating here would invalidate the password it already loaded.
if [ -f /var/www/html/wp-content/app-password.txt ]; then
  echo "Password file already exists, keeping it."
else
  wp eval '
$user = get_user_by("login", "admin");
$passwords = WP_Application_Passwords::get_user_application_passwords($user->ID);
foreach($passwords as $password) {
  WP_Application_Passwords::delete_application_password($user->ID, $password["uuid"]);
}
$created = WP_Application_Passwords::create_new_application_password(
  $user->ID,
  array("name" => "Next.js Docker")
);
file_put_contents("/var/www/html/wp-content/app-password.txt", $created[0]);
echo "Password saved.\n";
' --allow-root --path=/var/www/html
fi

echo "Done!"