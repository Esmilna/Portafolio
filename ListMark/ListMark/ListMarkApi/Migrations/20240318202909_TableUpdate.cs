using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ListMarkApi.Migrations
{
    /// <inheritdoc />
    public partial class TableUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductList_List_ListId",
                table: "ProductList");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductList_Product_ProductId",
                table: "ProductList");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "ProductList",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ListId",
                table: "ProductList",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductList_List_ListId",
                table: "ProductList",
                column: "ListId",
                principalTable: "List",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductList_Product_ProductId",
                table: "ProductList",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductList_List_ListId",
                table: "ProductList");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductList_Product_ProductId",
                table: "ProductList");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "ProductList",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ListId",
                table: "ProductList",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductList_List_ListId",
                table: "ProductList",
                column: "ListId",
                principalTable: "List",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductList_Product_ProductId",
                table: "ProductList",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
