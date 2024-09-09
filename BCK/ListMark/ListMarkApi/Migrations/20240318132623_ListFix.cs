using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ListMarkApi.Migrations
{
    /// <inheritdoc />
    public partial class ListFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ListNumberId",
                table: "ProductList",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ListNumberId",
                table: "ProductList");
        }
    }
}
