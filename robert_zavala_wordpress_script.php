<!-- Script configured from WordPress.org Codex

    1. Create a custom function update_jquery()
    2. Within function we deregister the current version of jquery:
        wp_deregister_script( $handle );
    3. Then we register a new script, custom version of jquery:
        wp_register_script( $handle, $src, $deps, $ver, $in_footer );
    4. Then we enqueue the new script:
        wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer );
    5. Finally, after the function we hook a function to an action:
        add_action( $hook, $function_to_add, $priority, $accepted_args );

    * Script to be added to the functios.php file

 -->

function update_jquery() {
  wp_deregister_script('jquery');
  wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.jsc', false, '3.2.1');
  wp_enqueue_script('jquery');
}

add_action('wp_enqueue_scripts', 'update_jquery');
