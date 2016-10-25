lock '3.6.1'

require_relative './secret'

set :application, 'get-native.com'
set :repo_url, "git@github.com:hank-ehly/get-native.com.git"
set :branch, 'master'
set :deploy_to, "/var/www/#{fetch(:application).to_s}/#{fetch(:stage)}"
set :scm, :git
set :linked_dirs, fetch(:linked_dirs, []).push('node_modules')

if fetch(:stage).to_s == 'production' then
    set :keep_releases, 5
    server fetch(:production_host), user: fetch(:production_user), ssh_options: {forward_agent: false}
elsif fetch(:stage).to_s == 'staging' then
    set :keep_releases, 3
    server fetch(:staging_host), user: fetch(:staging_user), ssh_options: {forward_agent: false}
end
